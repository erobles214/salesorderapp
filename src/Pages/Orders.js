/* eslint-disable react/no-unescaped-entities */
import { React, useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  Typography,
  TextField,
  Alert,
  Button,
  Autocomplete,
} from '@mui/material';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import postRequest from '../API/requestPost';
import { DateTimePicker } from '@mui/x-date-pickers';

function Orders(props) {
  const { handleSubmit, control } = useForm();
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [date, setDate] = useState();
  // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
  // const [cost, setCost] = useState('');
  const [otherValue, setOtherValue] = useState('');
  // const [value, setValue] = useState(LaborOptions[0]);
  // const [value, setValue] = useState(LaborOptions[0]);
  // const [inputValue, setInputValue] = useState('');

  const handleOtherValueChange = (event) => {
    setOtherValue(100.0);
  };

  const {
    fields: mFields,
    append: mAppend,
    remove: mRemove,
  } = useFieldArray({
    control,
    name: 'materials', // This should match the name in your form data
  });

  const {
    fields: lFields,
    append: lAppend,
    remove: lRemove,
  } = useFieldArray({
    control,
    name: 'labor', // This should match the name in your form data
  });

  useEffect(() => {
    const currentDate = new Date();
    setDate(
      `${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}-${currentDate.getFullYear()}`,
    );
    // console.log(currentDate);
  });
  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));

    // const igonre = 1;

    // if (igonre === 1) {
    //   return 'success';
    // } else {
    // async request which may result error
    const call = 'PostOrder';
    postRequest(data, call)
      .then(function (response) {
        setAlertContent('Good Response');
        setSuccess(true);
        return response;
      })
      .catch(function (error) {
        setAlertContent('Bad Response');
        setAlert(true);
        return error;
      });
    // }
    // setAlertContent('failed');
  };

  return (
    <form action="" id="order" method="Post" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="businessdate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                // label="Business Date"
                defaultValue={date}
                value={date}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...field}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}
            required
            name="startdate"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...field}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}
            name="enddate"
            control={control}
          />
        </Grid>
      </Grid>
      {mFields.map((item, index) => (
        <div key={item.id}>
          <Typography variant="h6" align="center" margin="dense">
            Add Material
          </Typography>
          <Box px={3} py={2} sx={{ p: 2, border: '2px dashed grey' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`materials[${index}]`}
                  control={control}
                  defaultValue={props}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      // eslint-disable-next-line react/prop-types
                      options={props.data[0].materialItems}
                      getOptionLabel={(option) => option.name || ''}
                      // value={value}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField {...params} label="Select an Option" />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`materials[${index}].cost`}
                  as={TextField}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Cost"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`materials[${index}].tax`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Tax"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Controller
                  id="materialId"
                  name={`materials[${index}].total`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Total"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`materials[${index}].quantity`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Quantity"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="button" onClick={() => mRemove(index)}>
              Remove
            </Button>
          </Box>
        </div>
      ))}
      {lFields.map((item, index) => (
        <div key={item.id}>
          <Box px={3} py={2} sx={{ p: 2, border: '2px dashed grey' }}>
            <Typography variant="h6" align="center" margin="dense">
              Add Labor
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`labor[${index}]`}
                  control={control}
                  defaultValue={LaborOptions[0]}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      // eslint-disable-next-line react/prop-types
                      options={props.data[0].laborItems}
                      getOptionLabel={(option) => option.name || ''}
                      // value={value}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField {...params} label="Select an Option" />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`labor[${index}].description`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Description"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`labor[${index}].comment`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Comment"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`labor[${index}].cost`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Cost"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`labor[${index}].total`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Total"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={2} sm={4}>
                <Controller
                  name={`labor[${index}].hours`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Hours"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} sm={4}>
                <Controller
                  name={`labor[${index}].status`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Status"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} sm={4}>
                <Controller
                  name={`labor[${index}].active`}
                  as={TextField}
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="dense"
                      label="Active"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="button" onClick={() => lRemove(index)}>
              Remove
            </Button>
          </Box>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => mAppend('')}
        variant="contained"
        color="primary"
        margin="1px"
      >
        Add Material
      </Button>
      <Button
        type="button"
        onClick={() => lAppend('')}
        variant="contained"
        color="primary"
      >
        Add Labor
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            value={otherValue}
            onChange={handleOtherValueChange}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Subtotal"
              />
            )}
            name="subtotal"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Tax Rate"
              />
            )}
            name="taxrate"
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Total Tax"
              />
            )}
            name="totaltax"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Material Total"
              />
            )}
            name="materialtotal"
            control={control}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Additional"
              />
            )}
            name="additional"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                margin="dense"
                label="Total"
              />
            )}
            name="total"
            control={control}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>

      <div>
        {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
        {success ? <Alert severity="success">{alertContent}</Alert> : <></>}
      </div>
    </form>
  );
}

const LaborOptions = [
  { name: 'Gorge Paint', id: 10000 },
  { name: 'Eddys Dry Wall Services', id: 10001 },
  { name: 'Julos Flooring', id: 10002 },
  { name: 'Carlos Demoltion', id: 10003 },
];

// const MaterialOptions = [
//   { name: 'White Desert Storm Color 5lbs', id: 20000 },
//   { name: 'Grey Color Basic 5lbs', id: 20001 },
//   { name: 'Paint Brushes 2pc', id: 20002 },
//   { name: 'Clear Coat 5lbs', id: 20003 },
// ];

export default Orders;
