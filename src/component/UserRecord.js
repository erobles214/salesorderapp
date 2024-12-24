import { React, useState, useEffect } from "react";
import { Container, Box, InputLabel, Grid, ButtonGroup, Button, TextField, Typography } from '@mui/material';
import UserModal from './UserModal'; 
import axios from 'axios';
import { GET_USERS } from "../API/requestGet";

const UserRecord = () => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const [modalType, setModalType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [UserData, setData] = useState([]);

    const fetchData = async () => {
        try{
            const response = await axios.get(GET_USERS,);
            setData(response.data);
          } catch (error) {
    
          } finally {
    
          }
        // console.log(inventoryData)    
    };

    useEffect(() => {        
        fetchData();
      }, []);

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
    const filteredUsers = UserData.filter(user => 
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
     user.userName.toLocaleLowerCase().includes(searchTerm.toLowerCase)
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

        {filteredUsers.map((user, index) => (
            <Box sx={{ 
                flexGrow: 5, 
                border: '1px solid #ccc', // Border color and style
                borderRadius: '8px',      // Rounded corners
                padding: 2,              // Padding inside the box
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', }}>            
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <InputLabel>                 
                            <Typography component="span" fontWeight="bold">
                                    Full Name: 
                                </Typography>
                                    {user.firstName} {user.lastName}
                         </InputLabel>                    
                        </Grid>                
                    <Grid item xs={12} sm={3}>
                        <InputLabel>
                            <Typography component="span" fontWeight="bold">
                                Email: 
                                </Typography>
                                    {user.userName}</InputLabel>                    
                        </Grid>   
                    <Grid item xs={12} sm={4}>
                        <InputLabel>
                            <Typography component="span" fontWeight="bold">
                                    Last Name: 
                                    </Typography>
                                    {user.email}</InputLabel>                    
                        </Grid>                    
             </Grid>          
              {/* ButtonGroup row */}
              <Grid container justifyContent="flex-end" margin={0}>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal('edit', user)}>Edit</Button>
                            <Button onClick={() => handleOpenModal('delete', user)}>Delete</Button>
                            <Button onClick={() => handleOpenModal('view', user)}>View</Button>
                        </ButtonGroup>
                </Grid>     
            </Box>
        ))}        
        <UserModal
                open={open}
                handleClose={handleCloseModal}
                handleDataUpdated={() => {
                    fetchData(); // Re-fetch users to update the list
                    handleCloseModal(); // Optionally close the modal after updating
                  }}
                modalType={modalType}
                modalData={modalData}
            />
        </Container>
    );
}

export default UserRecord;