import { React } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Grid, TextField,  } from '@mui/material';

function Manage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
  };
  return (
    <Container>
      <Box px={3} py={2}>
      <Typography variant="h6" align="center" margin="dense">
            Eneter New User
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
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    htmlFor="firstname"
                    {...register('firstname')}
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
                    {...register('lastName')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="User Name"
                    htmlFor="username"
                    {...register('username')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    htmlFor="email"
                    {...register('email')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    htmlFor="password"
                    {...register('password')}
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password2"
                    name="password2"
                    label="Re-Enter Password"
                    htmlFor="password2"                    
                    fullWidth
                    margin="dense"
                    // error={!!errors.fullname}
                  />
                </Grid>
              </Grid>
          </form>
      </Box>
    </Container>
  );
}

export default Manage;
