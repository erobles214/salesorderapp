import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Grid, TextField,  } from '@mui/material';
import UserRecord from '../component/UserRecord';
import users from "../Data/Users";

function Manage() {
  // const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   // Set users directly since they are imported, no fetch needed
  //   setUserData(users);
  //   console.log(userData);
  // }, [userData]);

  // const onSubmit = async (data) => {
  // };
  return (
    <Container
    sx={{
      
      marginTop: '20px',    // Top margin
      marginBottom: '20px', // Bottom margin
      marginLeft: '0px',   // Left margin
      marginRight: '0px',  // Right margin               
      }}
      max-width='1455px'
    >
      <Box px={3} py={2}>
      <Typography variant="h6" align="center" margin="dense">
            Users
          </Typography>
          <UserRecord />        
      </Box>
    </Container>
  );
}

export default Manage;
