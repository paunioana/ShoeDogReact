import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";
import '../css/ReviewsComponent.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import {getReviews} from "../api-calls/ShoeDogApi";
import {useSelector} from "react-redux";



    function createData(brand, product, user, publishDate, content, rating, place) {
        return {
            brand, product, user, rating,
            review:
                {
                    date: publishDate,
                    content: content,
                    place: place,
                }
        };
    }

    function Row(props) {
        const {row} = props;
        const [open, setOpen] = React.useState(false);



        return (
            <React.Fragment>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.brand}
                    </TableCell>
                    <TableCell align="right">{row.product}</TableCell>
                    <TableCell align="right">{row.user}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Review
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Review</TableCell>
                                            <TableCell align="right">Place</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                            <TableRow key={row.review.date}>
                                                <TableCell component="th" scope="row">
                                                    {row.review.date}
                                                </TableCell>
                                                <TableCell>{row.review.content}</TableCell>
                                                <TableCell align="right">{row.review.place}</TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

    // const rows = [
    //     createData('Frozen yoghurt', "hello", "hello", "hello", "hello", "hello", "hello")
    // ];






const ReviewsComponent = () => {
    const [rows, setRows] = useState([createData('Frozen yoghurt', "hello", "hello", "hello", "hello", "hello", "hello")]);
    const token = useSelector(state => state.token);

    useEffect(() => {

            getReviews(token.value).then((response) => {
                    console.log(response.data);
                }
            ).catch((error) => {
                console.log(error);
            });


    }, []);

    return (
        <Box id="grid-reviews">
        <TableContainer component={Paper} >
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Brand</TableCell>
                        <TableCell align="right">Product</TableCell>
                        <TableCell align="right">User</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.brand} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}
export default ReviewsComponent;



