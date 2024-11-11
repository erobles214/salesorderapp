import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Grid, TextField,  } from '@mui/material';
import InventoryRecord from '../component/InventoryRecord';
import InventoryData from "../Data/Users";

function Inventory() {
  // const [inventoryData, setInventoryData] = useState([]);
  return (
    <Container>
    <Box px={3} py={2}>
    <Typography variant="h6" align="center" margin="dense">
          Inventory
        </Typography>
        <InventoryRecord />
    </Box>
  </Container>
  );
}

export default Inventory;
