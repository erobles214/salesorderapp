import React from "react";
import { Container, Box, InputLabel, Typography, Grid, TextField,  } from '@mui/material';

const UserRecord = ({ users }) => {
    console.log('Users:', users);
return(
    <Container>      
        {users.map((user, index) => (
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
            <Grid item xs={12} sm={6}>
                <InputLabel>Name: {user.firstName}</InputLabel>                    
                </Grid>    
             </Grid>  
            </Box>

        ))}        
        </Container>
    );
}

export default UserRecord;