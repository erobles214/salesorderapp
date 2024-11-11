import { React, useState, useEffect } from "react";
import { Container, Box, InputLabel, Grid, ButtonGroup, Button, TextField } from '@mui/material';
import axios from 'axios';
import { GET_INVENTORY } from '../API/requestGet';

const InventoryRecord = () => {

    const [InventoryData, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const fetchData = async () => {
      try{
          const response = await axios.get(GET_INVENTORY,);
          setData(response.data);
        } catch (error) {
  
        } finally {
  
        }
      };
      fetchData();
    }, []);
    
    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    // Filter users based on the search term
    const filteredUsers = InventoryData.filter(inventory => 
        `${inventory.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inventory.brand.toLocaleLowerCase().includes(searchTerm.toLowerCase)
        )

    return(
        <Container>
        {/* Search Box */}
        <Box my={2}>
            <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, email, or username"
                />
        </Box>
        {filteredUsers.map((inventory, index) => (
            <Box key={inventory.id || index}
            px={3}
            py={2}
            sx={{
                width: 1250,
                border: '1px solid #ccc', // Light gray border
                borderRadius: '8px', // Optional: Rounded corners
                marginBottom: '16px', // Space between boxes
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
            }}
            > 
            <Grid container>  
                    <Grid item xs={12} sm={2}>
                        <InputLabel size="small">Material Number: {inventory.materialNumber} </InputLabel>                    
                        </Grid>                        
                    <Grid item xs={12} sm={3}>
                        <InputLabel size="small">Name: {inventory.name} </InputLabel>                    
                        </Grid>   
                    <Grid item xs={12} sm={2}>
                        <InputLabel size="small">Brand: {inventory.brand} </InputLabel>                    
                        </Grid>   
                    <Grid item xs={12} sm={2}>
                        <InputLabel size="small">Price: {inventory.price} </InputLabel>                    
                        </Grid>  
                    <Grid item xs={12} sm={1}>
                        <InputLabel size="small">Stock: {inventory.stock} </InputLabel>                    
                        </Grid> 
                    <Grid item xs={12} sm={2}>
                        <InputLabel size="small">Out Of Stock: {inventory.outOfStock} </InputLabel>                    
                        </Grid>                        
             </Grid>               
            </Box>

        ))} 
        </Container>
    )
}

export default InventoryRecord;