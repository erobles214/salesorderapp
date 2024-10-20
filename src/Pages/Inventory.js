import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, Grid, TextField,  } from '@mui/material';
import InventoryRecord from '../component/InventoryRecord';
import data from "../Data/Inventory";

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    setInventoryData(data);
    console.log(inventoryData)
  }, [inventoryData]);

  return (
    <Container>
    <Box px={3} py={2}>
    <Typography variant="h6" align="center" margin="dense">
          Users
        </Typography>
        <InventoryRecord item={inventoryData} />
    </Box>
  </Container>
  );
}

export default Inventory;
