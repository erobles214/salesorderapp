import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import EditInventory from '../Pages/EditInventory';

const InvModal = ({open, handleClose, handleDataUpdated,modalType, modalData }) => {
    const renderModalContent = () => {
        if(!modalData) return null;


        switch (modalType) {
            case 'edit':
                console.log('Users modalData:'[modalData]);
                return(
                    <DialogContent>
                        <Typography>Edit Material: {modalData.Name}</Typography>
                    <EditInventory
                        inventory={[modalData]}
                        onSuccess={() => {
                            handleDataUpdated();
                        }}
                    ></EditInventory>
                    </DialogContent>
                );
            case 'delete':
                return(
                    <DialogContent>
                        <Typography>Are you sure you want to delete {modalData.Name}?</Typography>
                    </DialogContent>
                );
            case 'View':
                return(
                    <DialogContent>
                        <Typography>Viewing User:</Typography>
                        <Typography>Full Name: {modalData.Name}</Typography>
                        
                    </DialogContent>
                );
            default: 
            return null;
        }

    }

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

export default InvModal;