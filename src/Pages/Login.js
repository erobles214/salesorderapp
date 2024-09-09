// LoginPage.js
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import authaticate from '../API/Auth';

function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const defaultTheme = createTheme();


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [isError, setError] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const navigate = useNavigate();
    // const location = useLocation();
    // console.log(location);
    // navigate.push('pages/Dashboard');
    // const data = new FormData(event.currentTarget);
    // const email = data.get('email');
    // const password = data.get('password');

    // const request = JSON.stringify({ email, password });

    // authaticate(request)
    //   .then(function (response) {
    //     setSuccess(true);
    //     return response;
    //   })
    //   .catch(function (error) {
    //     return error;
    //   });

    // if (success === true) {
    //   <Dashboard />;
    // }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const request = JSON.stringify({ email, password });
    try {
       
      const response = await authaticate(request);

      if (response.status === 200) {
        // Assuming your API returns a token upon successful login
        const token = response.data.token;

        // Store the token in local storage or a state management system
        localStorage.setItem('token', token);
        
        // Successful login, redirect to dashboard
        history('/dashboard');
      } else {
        // Handle other HTTP statuses (e.g., show error message)
       
      }
    } catch (error) {
      // console.error('Login failed:', response.statusText);
        setError(true);
        setAlertContent('Login Failed');
        setAlert(true);        
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <div>
        {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
      </div>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  );
};

export default Login;