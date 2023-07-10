import {Box, Button, Modal } from "@mui/material";
import {approveProduct, deleteProduct} from "../api-calls/ShoeDogApi";

const ApproveModal = (props) => {
    const onClose = props.onClose;

    const approve = () => {
        onClose(undefined);
        console.log(props);
        approveProduct(props.modalData.id, props.modalData.token).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    const reject = () => {
        onClose(undefined);
        deleteProduct(props.modalData.id, props.modalData.token).then((response) => {
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
                <div>Are you sure you want to approve this product?</div>
                <div>
                    <Button variant="contained" color="primary" type="submit" onClick={() => approve()}>Approve</Button>
                    <Button variant="outlined" color="primary" onClick={() => reject()}>Reject</Button>
                    <Button variant="outlined" color="primary" onClick={() => cancel()}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ApproveModal;