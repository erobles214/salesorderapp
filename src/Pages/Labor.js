/* eslint-disable react/no-unescaped-entities */
import { React, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper, Typography, TextField, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import postRequest from '../API/requestPost';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

function Labor() {
  const { register, handleSubmit } = useForm();
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const onSubmit = async (data) => {
    // async request which may result error
    const call = 'PostLabor';
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
    // setAlertContent('failed');
  };

  return (
    <Container>
      <Paper>
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            Eneter Labor
          </Typography>
          <form
            action=""
            id="order"
            method="Post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  htmlFor="name"
                  {...register('name')}
                  fullWidth
                  margin="dense"
                  // error={!!errors.fullname}
                />

                {/* <label htmlFor="orderid">Order ID</label>
                    <input {...register('orderid')} /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="type"
                  name="type"
                  label="Type"
                  htmlFor="type"
                  {...register('type')}
                  fullWidth
                  margin="dense"
                  // error={!!errors.fullname}
                />
                {/* <label htmlFor="ordernumberid">Order Number ID</label>
                    <input {...register('ordernumberid')} /> */}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  htmlFor="description"
                  {...register('description')}
                  fullWidth
                  margin="dense"
                  // error={!!errors.fullname}
                />
                {/* <label htmlFor="workorderid">Work Order ID</label>
                    <input {...register('workorderid')} /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="comment"
                  name="comment"
                  label="Comment"
                  htmlFor="comment"
                  {...register('comment')}
                  fullWidth
                  margin="dense"
                  // error={!!errors.fullname}
                />
                {/* <label htmlFor="businessdate">Business Date</label>
                    <input {...register('businessdate')} /> */}
              </Grid>
            </Grid>
            <div>
              <button>Submit</button>
              {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
              {success ? (
                <Alert severity="success">{alertContent}</Alert>
              ) : (
                <></>
              )}
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default Labor;
