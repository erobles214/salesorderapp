import { React, useState } from "react";
import { Container, Box, InputLabel, Grid, ButtonGroup, Button, TextField } from '@mui/material';

const InventoryRecord = ({ item }) => {
    console.log('Users:', item);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Function to open modal and set modal data
    const handleOpenModal = (type, user) => {
        setModalType(type);
        setModalData(user);
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
    const filteredItem = item.filter(item => 
    `${item.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.brand.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
     item.id.toLocaleLowerCase().includes(searchTerm.toLowerCase)
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

        {filteredItem.map((item, index) => (
            <Box key={item.id || index}
            px={3}
            py={2}
            sx={{
                border: '1px solid #ccc', // Light gray border
                borderRadius: '8px', // Optional: Rounded corners
                marginBottom: '16px', // Space between boxes
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
            }}
            > 
            <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <InputLabel>Item Id: {item.id}</InputLabel>                    
                        </Grid>  
                </Grid>
            <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Item Name: {item.name}</InputLabel>                    
                        </Grid>                
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Item Brand: {item.brand}</InputLabel>                    
                        </Grid>   
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Type: {item.type}</InputLabel>                    
                        </Grid>  
                    {/* <Grid item xs={12} sm={2}>
                        <InputLabel>Price: {item.price}</InputLabel>                    
                        </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel>Stock: {item.stock}</InputLabel>                    
                        </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel>Out of Stock: {item.outOfStock}</InputLabel>                    
                        </Grid> */}
                    <Grid item xs={12} sm={3}> 
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal('edit', item)}>Edit</Button>
                            <Button onClick={() => handleOpenModal('delete', item)}>Delete</Button>
                            <Button onClick={() => handleOpenModal('view', item)}>View</Button>
                        </ButtonGroup>
                    </Grid>
             </Grid>               
            </Box>

        ))}        
        {/* <UserModal
                open={open}
                handleClose={handleCloseModal}
                modalType={modalType}
                modalData={modalData}
            /> */}
        </Container>
    );
}

export default InventoryRecord;