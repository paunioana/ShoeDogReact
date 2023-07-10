import React, {useEffect, useState} from "react";
import { Box} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import {getReviews, getUserReviews} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";
import '../css/PostsComponent.css';
import Rating from "@mui/material/Rating";
import moment from 'moment';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import ConfirmModal from "./ConfirmModal";
import {useLocation} from "react-router-dom";
const PostsComponent = () => {
    const [posts, setPosts] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const isAdmin = useSelector(state => state.user.role=== "ADMIN");
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const location = useLocation();

    const renderRatingCell = (params) => {
        const value = Number(params.value); // Assuming the rating value is provided as a number
        return <Rating name={`rating-${params.row.id}`} value={value} precision={0.5} readOnly/>;
    };

    const renderDeleteIcon = (id) => {
        if(isAdmin){
        return (
            <DeleteSweepOutlinedIcon style={{ cursor: 'pointer' }}
                                     onClick={() =>setModalData({
                                         reviewId: id,
                                         token: token.value
                                     })}
            />
        );
        }
        else {return "";}

    };
    const wrapCellContent = (content) => {
        return (
            <div style={{ whiteSpace: 'normal', padding: "8px", wordBreak: 'break-word', textAlign:'left' }}>
                {content}
            </div>
        );
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
        { field: 'id',headerName:'', valueGetter: (params) => {
                return `${params.row.id}`;}, renderCell: (params) => renderDeleteIcon(params.value), width: 50,
          }
    ];
    useEffect(() => {
        console.log(location);
        if(location.state === null) {
            getReviews().then((response) => {
                setPosts(response.data);
            })
                .catch((error) => {
                    console.log(error);
                });
        } else if(location.state.filter) {
            getUserReviews(user.email, token.value).then((response) => {
                setPosts(response.data);
            })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [modalData]);

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
                    }} rows={posts} columns={columns}/>

                </Box>
            )}
            {modalData && <ConfirmModal modalData={modalData} onClose={() => setModalData(undefined)}/>}
        </Box>
    );

};
export default PostsComponent;