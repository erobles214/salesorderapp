import { React, useState } from "react";
import { Container, Box, InputLabel, Grid, ButtonGroup, Button, TextField } from '@mui/material';
import UserModal from './UserModal'; 

const UserRecord = ({ users }) => {
    console.log('Users:', users);
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
    const filteredUsers = users.filter(user => 
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
     user.userName.toLocaleLowerCase().includes(searchTerm.toLowerCase)
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

        {filteredUsers.map((user, index) => (
            <Box key={user.id || index}
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
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Full Name: {user.firstName} {user.lastName}</InputLabel>                    
                        </Grid>                
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Email: {user.userName}</InputLabel>                    
                        </Grid>   
                    <Grid item xs={12} sm={3}>
                        <InputLabel>Last Name: {user.email}</InputLabel>                    
                        </Grid>  
                    <Grid item xs={12} sm={3}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleOpenModal('edit', user)}>Edit</Button>
                            <Button onClick={() => handleOpenModal('delete', user)}>Delete</Button>
                            <Button onClick={() => handleOpenModal('view', user)}>View</Button>
                        </ButtonGroup>
                    </Grid>
             </Grid>               
            </Box>

        ))}        
        <UserModal
                open={open}
                handleClose={handleCloseModal}
                modalType={modalType}
                modalData={modalData}
            />
        </Container>
    );
}

export default UserRecord;