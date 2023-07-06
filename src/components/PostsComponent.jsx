import React, {useEffect, useState} from "react";
import { Box} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import CommentsModal from "./CommentsModal";
import {getReviews} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";
import '../css/PostsComponent.css';
import Rating from "@mui/material/Rating";
import moment from 'moment';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
const PostsComponent = () => {
    const [posts, setPosts] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const isAdmin = useSelector(state => state.user.role=== "ADMIN");
    const token = useSelector(state => state.token);

    const renderRatingCell = (params) => {
        const value = Number(params.value); // Assuming the rating value is provided as a number
        return <Rating name={`rating-${params.row.id}`} value={value} precision={0.5} readOnly/>;
    };

    const renderDeleteIcon = (params) => {
        if(isAdmin){
        return (
            <DeleteSweepOutlinedIcon style={{ cursor: 'pointer' }}
            />
        );}
        else {return "";}

    };
    const wrapCellContent = (content) => {
        return (
            <div style={{ whiteSpace: 'normal', padding: "8px", wordBreak: 'break-word', textAlign:'left' }}>
                {content}
            </div>
        );
    };
    const handleDelete = (params) => {
        // Handle the delete action for the corresponding row
        const { id } = params.row;
        // Implement your delete logic here using the row ID

        // For example, you can console log the deleted row ID
        console.log(`Deleted row with ID: ${id}`);
    };


    const columns = [
        {field: "product", headerName: "Brand", valueGetter: (params) => {
                return `${params.row.product.brand.name}`;
            },headerClassName: 'super-app-theme--header', width: 200},
        {field: "product.model", headerName: "Model", valueGetter: (params) => {
                return `${params.row.product.model}`;
            }, width: 200 },
        {field: "review_content", headerName: "Review",renderCell: (params) => wrapCellContent(params.value), minWidth: 400, flex: 1},
        {field: "rating", headerName: "Rating", renderCell: renderRatingCell,width: 150},
        {field: "name", headerName: "User", minWidth: 100, valueGetter: (params) => {
                return `${params.row.user.firstName || ''} ${params.row.user.lastName || ''}`;
            }, width: 200},
        {field: "date", headerName: "Date", minWidth: 110, valueGetter: (params) => {
                const formattedDate = moment(params.row.publishedOn).format('DD/MM/YYYY HH:mm');
                return formattedDate;
            },width: 150},
        { field: '',valueGetter: (params) => {
                return `${params.row.id}`;}, renderCell: (params) => renderDeleteIcon(params.value), width: 50,
          }
    ];
    useEffect(() => {
        getReviews().then( (response) => {
            setPosts(response.data);
        })
            .catch( (error) => {
                console.log(error);
            });
    }, []);

    const onCellClick = (cellInfo) => {
        const postId = cellInfo.row.id;

                setModalData({
                    comments: posts
                });

    };
    const ODD_OPACITY = 0.2;

    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
            '&.Mui-selected': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover, &.Mui-hovered': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity,
                    ),
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity,
                        ),
                    },
                },
            },
        },
        [`& .${gridClasses.columnHeaderTitle}`]: {
            fontSize: 20,
            fontWeight: 900,
            color: '#f5f5f5',
            marginLeft: '10px'
        },
        [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: '#00ADB2'
        },
        [`& .${gridClasses.cellContent}`]: {
            marginLeft: '10px'
        }

    }));

    return (
        <Box style={{ height: '100%', width: '100%', paddingTop: '50px', justifyContent: 'center', display: 'flex' }}>
            {posts === undefined && <div>There are no posts yet</div>}
            {posts && (
                <Box width="80%">
                    <StripedDataGrid
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }  sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }} onCellClick={onCellClick} rows={posts} columns={columns}/>
                    {modalData && <CommentsModal modalData={modalData} onClose={() => setModalData(undefined)}/>}
                </Box>
            )}
        </Box>
    );

};
export default PostsComponent;