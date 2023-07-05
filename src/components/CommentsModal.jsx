import React, {useState} from "react";
import {Box, Button, Modal, TextField} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WorkIcon from '@mui/icons-material/Work';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DomainIcon from '@mui/icons-material/Domain';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {DataGrid} from "@mui/x-data-grid";


const CommentsModal = (props) => {
    const onClose = props.onClose;
    const comments = props.modalData.comments;
    const [modalData, setModalData] = useState(undefined);
    const columns = [
        {field: "postId", headerName: "postId", width: 50},
        {field: "id", headerName: "userId", width: 50},
        {field: "name", headerName: "Name", width: 400},
        {field: "email", headerName: "email", width: 200},
        {field: "body", headerName: "Body", width: 900}
    ];

    return (
        <Modal open onClose={() => onClose(undefined)}>
            <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    position="relative"
                    borderRadius="15px"
                    width="80%"
                    height="50%"
                    bgcolor="#a2add0"
                    display="flex"
                    flexDirection="column"
                    p={3}
                >
                    <Box width="100%" height="100%" display="flex" justifyContent="center">
                        {comments === undefined && <div>There are no comments yet</div>}
                        {comments && (
                            <Box width="100%">
                                <DataGrid rows={comments} columns={columns}/>
                            </Box>
                        )}
                    </Box>
                    <Button variant="contained" onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CommentsModal;