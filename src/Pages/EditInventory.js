import { React, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper, Typography, TextField, Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAsyncError } from 'react-router-dom';
import postRequest from '../API/requestPost';

const EditInventory = ({inventory, onSuccess}) => {
    const { register, handleSubmit, setValue, formState: {errors } } = useForm({
      defaultValues: {
        id: inventory[0].id || '',
        name: inventory[0].name || '',
        brand: inventory[0].brand || '',
        tpye: inventory[0].type || '',
        price: inventory[0].price || '',
        stock: inventory[0].stock || '',
        outOfStock: inventory[0].outOfStock || '',
      },
    });
    //const { register, handleSubmit } = useForm();
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState();
    const [alertContent, setAlertContent] = useState();

    // Const for form data
    //const [isVisible, setIsVisible] = useState(false); 
    const [id] = useState(inventory[0].id);
    //const [materialNumber, setMaterialNumber] = useState(inventory[0].materialNumber);
    const [name, setName] = useState(inventory[0].name);
    const [brand, setBrand] = useState(inventory[0].brand);
    const [type, setType] = useState(inventory[0].type);
    const [price, setPrice] = useState(inventory[0].price);
    const [stock, setStock] = useState(inventory[0].stock);
    const [outOfStock, setOutOfStock] = useState(inventory[0].outOfStock);


    // const handleNameChange = (e) => setName(e.target.value);
    // const handleBrandChange = (e) => setBrand(e.target.value);
    // const handleTypeChange = (e) => setType(e.target.value);
    // const handlePriceChange = (e) => setPrice(e.target.value);
    // const handleStockChange = (e) => setStock(e.target.value);
    // const handleOutOfStockChange = (e) => setOutOfStock(e.target.value);
    
    const onSubmit = async (data) => {
        //data.preventDefault();
        const call = 'PostUpdtInv'
        // Submit logic here, e.g., making a post request with the updated user data
        console.log('Updated Inventory Data:', {
        name,
        brand,
      });

      try{
        const reponse = await postRequest(data, call);

        if(reponse.status === 200){
          setAlertContent("Item updated successfully");
          setSuccess(true);
          
          if(onSuccess)
          {
            onSuccess();
          }
        }
      }
      catch{
        setAlertContent('Bad Response');
        setAlert(true);
      }
      // postRequest(data, call)
      // .then(function (response) {
      //   setAlertContent('Good Response');
      //   setSuccess(true);
      //   return response;
      // })
      // .catch(function (error) {
      //   setAlertContent('Bad Response');
      //   setAlert(true);
      //   return error;
      // });
    };
    return(
        <Container>
            <Paper>
                <Box px={3} py={2}>
                <form
                    action=""
                    id="order"
                    method='Post'
                    onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={1}>
              
                {/* {isVisible && (
                   <TextField
                   required
                   id="id"
                   name="id"
                   label="id"                    
                   value={id}
                   {...register('id')}
                   fullWidth
                   margin="dense"
                   // error={!!errors.fullname}
                 />    
                )}                            */}
 
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="name"                    
                    //value={name}
                    //onChange={handleNameChange}
                    {...register('name')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="brand"
                    name="brand"
                    label="Brand"
                    htmlFor="brand"
                    //value={brand}
                    //onChange={handleBrandChange}
                    {...register('brand')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="type"
                    name="type"
                    label="Type"
                    htmlFor="type"
                    //value={type}
                    //onChange={handleTypeChange}
                    {...register('type')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                  {/* <label htmlFor="businessdate">Business Date</label>
                      <input {...register('businessdate')} /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="price"
                    name="price"
                    label="Price"
                    htmlFor="price"
                    //value={price}
                    //onChange={handlePriceChange}
                    {...register('price')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                  {/* <label htmlFor="businessdate">Business Date</label>
                      <input {...register('businessdate')} /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="stock"
                    name="stock"
                    label="Stock"
                    htmlFor="stock"
                    //value={stock}
                    //onChange={handleStockChange}
                    {...register('stock')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                  {/* <label htmlFor="businessdate">Business Date</label>
                      <input {...register('businessdate')} /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outOfStock"
                    name="outOfStock"
                    label="Out Of Stock"
                    htmlFor="outOfStock"
                    //value={outOfStock}
                    //onChange={handleOutOfStockChange}
                    {...register('outOfStock')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                  {/* <label htmlFor="businessdate">Business Date</label>
                      <input {...register('businessdate')} /> */}
                </Grid>
              </Grid>
              <div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
                {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
                {success ? (
                  <Alert severity="success">{alertContent}</Alert>
                ) : (
                  <></>
                )}
              </div>
                    </form>
                    </Box>
                </ Paper>
        </Container>
    );
}

export default EditInventory;