import React, {useEffect, useState} from "react";
import { Box} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import CommentsModal from "./CommentsModal";
import {getReviews} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";
import '../css/PostsComponent.css';
import Rating from "@mui/material/Rating";
const PostsComponent = () => {
    const [posts, setPosts] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    const renderRatingCell = (params) => {
        const value = Number(params.value); // Assuming the rating value is provided as a number
        return <Rating name={`rating-${params.row.id}`} value={value} precision={0.5} readOnly/>;
    };
    const wrapCellContent = (content) => {
        return (
            <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign:'left' }}>
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
            }, width:200},
        {field: "review_content", headerName: "Review",renderCell: (params) => wrapCellContent(params.value), width: '800'},
        {field: "rating", headerName: "Rating", renderCell: renderRatingCell,width: 200},
        {field: "name", headerName: "User", width: 100, valueGetter: (params) => {
                return `${params.row.user.firstName || ''} ${params.row.user.lastName || ''}`;
            }},
        {field: "date", headerName: "Date", width: 110, valueGetter: (params) => {
                return `${params.row.user.firstName}`;
            }}
    ];
    useEffect(() => {
        getReviews(token.value).then( (response) => {
            console.log(response);
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
            color: '#f5f5f5'
        },
        [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: '#00ADB2'
        },

    }));

    return (
        <Box width="100%" height="100%" display="flex" justifyContent="center">
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