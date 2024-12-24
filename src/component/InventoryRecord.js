import { React, useState, useEffect } from "react";
import { Container, Box, InputLabel, Grid, ButtonGroup, Button, TextField, Typography } from '@mui/material';
import InvModal from './InventoryModal';
import axios from 'axios';
import { GET_INVENTORY } from '../API/requestGet';

const InventoryRecord = () => {

    const [open, setOpen] = useState(false);
    const [InventoryData, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalData, setModalData] = useState("");
    const [modalType, setModalType] = useState("");

 
    const fetchData = async () => {
        try{
            const response = await axios.get(GET_INVENTORY,);
            setData(response.data);
          } catch (error) {
    
          } finally {
    
          }
    };

    useEffect(() => {      
      fetchData();
    }, []);
    
     // Function to open modal and set modal data
     const handleOpenModal = (type, inventory) => {
        setModalType(type);
        setModalData(inventory);
        setOpen(true);
    };

    // Function to close modal
    const handleCloseModal = () => {
        setOpen(false);
        setModalData(null);
        setModalType("");
    };


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
        <Container
            sx={{
            marginTop: '20px',    // Top margin
            marginBottom: '20px', // Bottom margin
            marginLeft: '0px',   // Left margin
            marginRight: '0px',  // Right margin          
            }}
            max-width='1455px'
        >
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
        <Box sx={{ 
            flexGrow: 5, 
            border: '1px solid #ccc', // Border color and style
            borderRadius: '8px',      // Rounded corners
            padding: 2,              // Padding inside the box
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', }}>
        <Grid container spacing={2}>
                {/* InputLabel rows */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                Material Number: 
                                </Typography>
                                {inventory.materialNumber}
                        </InputLabel>
                        </Grid>
                        <Grid item xs={3}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                Name: {inventory.name}
                                </Typography>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={3}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                    Brand: {inventory.brand}
                                    </Typography>
                        </InputLabel>
                        </Grid>
                        <Grid item xs={2}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                    Price: {inventory.price}
                                    </Typography>
                            </InputLabel>
                        </Grid>
                        <Grid item xs={3}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                    Stock: {inventory.stock}
                                    </Typography>
                        </InputLabel>
                        </Grid>
                        <Grid item xs={3}>
                        <InputLabel size="small">
                            <Typography component="span" fontWeight="bold">
                                    Out Of Stock: {inventory.outOfStock}
                                    </Typography>
                            </InputLabel>
                        </Grid>
                    </Grid>
            </Grid>

            {/* ButtonGroup row */}
            <Grid container justifyContent="flex-end" margin={1}>
            <ButtonGroup variant="contained" aria-label="Basic button group" size='large'>
                <Button onClick={() => handleOpenModal('edit', inventory)}>Edit</Button>
                <Button onClick={() => handleOpenModal('delete', inventory)}>Delete</Button>
                <Button onClick={() => handleOpenModal('view', inventory)}>View</Button>
            </ButtonGroup>
            </Grid>
        </Grid>
        </Box>
        ))} 
        <InvModal
            open={open}
            handleClose={handleCloseModal}
            handleDataUpdated={() =>  {
                fetchData();
                handleCloseModal();
            }}
            modalType={modalType}
            modalData={modalData}   
        />
        </Container>
    )
}

export default InventoryRecord;