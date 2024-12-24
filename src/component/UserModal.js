import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import EditUser from '../Pages/EditUser';

const UserModal = ({ open, handleClose, handleDataUpdated, modalType, modalData }) => {
    const renderModalContent = () => {
        if (!modalData) return null;

        switch (modalType) {
            case 'edit':
                console.log('Users modalData:', [modalData]);
                return (
                    <DialogContent>
                        <Typography>Edit User: {modalData.firstName} {modalData.lastName}</Typography>
                     <EditUser
                            user={[modalData]}    
                            onSuccess={() => {
                                handleDataUpdated();
                            }}
                        ></EditUser>
                    </DialogContent>                    
                );
            case 'delete':
                return (
                    <DialogContent>
                        <Typography>Are you sure you want to delete {modalData.firstName} {modalData.lastName}?</Typography>
                    </DialogContent>
                );
            case 'view':
                return (
                    <DialogContent>
                        <Typography>Viewing User:</Typography>
                        <Typography>Full Name: {modalData.firstName} {modalData.lastName}</Typography>
                        <Typography>Email: {modalData.email}</Typography>
                        <Typography>Viewing User:</Typography>
                        <Typography>Full Name: {modalData.firstName} {modalData.lastName}</Typography>
                        <Typography>Email: {modalData.email}</Typography>
                    </DialogContent>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog fullWidth={true}
        maxWidth={'lg'} open={open} onClose={handleClose}>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
            {/* <DialogTitle>{modalType.charAt(0).toUpperCase() + modalType.slice(1)} User</DialogTitle> */}
            {renderModalContent()}
            
        </Dialog>
    );

};

export default UserModal; 