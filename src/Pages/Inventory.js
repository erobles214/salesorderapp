import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Grid, TextField,  } from '@mui/material';
import UserRecord from '../component/UserRecord';
import InventoryData from "../Data/Users";

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    setInventoryData(InventoryData);
    console.log(inventoryData)
  });
  return (
    <Container>
    <Box px={3} py={2}>
    <Typography variant="h6" align="center" margin="dense">
          Users
        </Typography>
        <UserRecord users={inventoryData} />
    </Box>
  </Container>
  );
}

export default Inventory;
