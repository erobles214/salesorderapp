import { React, useState, useEffect  } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper, Typography, TextField, Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import postRequest from '../API/requestPost';


const EditUser = ({user, onSuccess}) => {
    console.log('Users:', user);

    // Initialize react-hook-form with default values from the user prop
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      id: user[0].id || '',
      firstName: user[0].firstName || '',
      lastName: user[0].lastName || '',
      userName: user[0].userName || '',
      email: user[0].email || '',
    },
  });

  // const { register, handleSubmit, setValue } = useForm();
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  // Const for form data
  const [firstName, setFirstName] = useState(user[0].firstName || '');
  const [lastName, setLastName] = useState(user[0].lastName || '');
  const [userName, setUserName] = useState(user[0].userName || '');
  const [email, setEmail] = useState(user[0].email || '');

  // // Handle changes for each field
  // const handleFirstNameChange = (e) => {
  //   setFirstName(e.target.value);
  //   setValue('firstName', e.target.value);  // Update react-hook-form value
  // };
  // const handleLastNameChange = (e) => {
  //   setLastName(e.target.value);
  //   setValue('lastName', e.target.value);  // Update react-hook-form value
  // };
  // const handleUserNameChange = (e) => {
  //   setUserName(e.target.value);
  //   setValue('userName', e.target.value);  // Update react-hook-form value
  // };
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   setValue('email', e.target.value);  // Update react-hook-form value
  // };
  const onSubmit = async (data) => {
    //data.preventDefault();
    const call = 'PostUpdtUser'
    // Submit logic here, e.g., making a post request with the updated user data
    console.log('Updated User Data:', {
      firstName,
      lastName,
      userName,
      email,
    });
    
    try{
        const response = await postRequest(data, call);

        if(response.status === 200) {
          setAlertContent("User updated successfully");
          setSuccess(true);
          
          if(onSuccess)
          {
            onSuccess();
          }
        }       
        else{
          setAlertContent("Failed to update user.");
          setAlert(true);
        }
    }
    catch
    {
      setAlertContent('Bad Response');
      setAlert(true);
    }

      // postRequest(data, call)
      //   .then(function (response) {
      //     setAlertContent('Good Response');
      //     setSuccess(true);
      //     return response;
      // })
      // .catch(function (error) {
      //   setAlertContent('Bad Response');
      //   setAlert(true);
      //    return error;
      // });

  };

  // // Synchronize initial values with react-hook-form
  // useEffect(() => {
  //   setValue('firstName', firstName);
  //   setValue('lastName', lastName);
  //   setValue('userName', userName);
  //   setValue('email', email);
  // }, [firstName, lastName, userName, email, setValue]);

    return(
        <Container>
        <Paper>
          <Box px={3} py={2}>
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
                    id="firstName"
                    name="firstName"
                    label="First Name"                    
                    //value={firstName}
                    // onChange={handleFirstNameChange}
                    {...register('firstName')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    htmlFor="lastName"
                    //value={lastName}
                    //onChange={handleLastNameChange}
                    {...register('lastName')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="userName"
                    name="userName"
                    label="User Name"
                    htmlFor="userName"
                    //value={userName}
                    //onChange={handleUserNameChange}
                    {...register('userName')}
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
                    id="email"
                    name="email"
                    label="Email"
                    htmlFor="email"
                    //value={email}
                    //onChange={handleEmailChange}
                    {...register('email')}
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
        </Paper>
      </Container>
    );
}

export default EditUser;