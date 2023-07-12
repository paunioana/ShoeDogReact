import {Box, Button, Modal, TextField} from "@mui/material";
import {deleteReview} from "../api-calls/ShoeDogApi";

const ConfirmModal = (props) => {
    const onClose = props.onClose;

    const confirmDeletion = () => {
        onClose(undefined);
        deleteReview(props.modalData.reviewId, props.modalData.token).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        onClose(undefined);

    };

    return (
        <Modal  style={{
            display: 'flex',
            alignItems: 'center',
        }}
                open onClose={() => onClose(undefined)}>
            <Box sx={{
                width: '400px',
                height: '100px',
                backgroundColor: 'white',display: 'flex',
                alignItems: 'center',
                flexDirection:'column',
                paddingTop:'20px',
                margin: 'auto'

            }}
            >
                <div>Are you sure you want to delete this review?</div>
                <div>
                    <Button variant="contained" color="primary" type="submit" onClick={() => confirmDeletion()}>Delete</Button>
                    <Button variant="outlined" color="primary" onClick={() => cancel()}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;