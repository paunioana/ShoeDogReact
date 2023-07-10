import React, {useEffect, useState} from "react";
import { useTheme } from '@mui/material/styles';
import {useSelector} from "react-redux";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import {getRequests} from "../api-calls/ShoeDogApi";
import {useNavigate} from "react-router-dom";
import {TableHead} from "@mui/material";
import RuleIcon from '@mui/icons-material/Rule';
import ApproveModal from "./ApproveModal";
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};




const RequestsComponent = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [requests, setRequests] = useState([]);
    const [modalData, setModalData] = useState(undefined);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const emptyRows =  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;
    const navigate = useNavigate();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if(user.role === "ADMIN") {
            getRequests(token.value).then((response) => {
                console.log(response.data);
                setRequests(response.data);
            })
                .catch((error) => {
                    console.log(error);
                });
        } else  {
            navigate("/addReview");
        }
    }, [modalData]);

    const handleApproval = (e) =>{
        let id = e.currentTarget.getAttribute("value");
        setModalData({
            id: id,
            token: token.value
        });
    };

    return (<div>
        <TableContainer component={Paper} sx={{ width: 700, margin: 'auto', marginTop: 10 }}>
            <Table  aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="right">Model</TableCell>
                        <TableCell align="right">Brand</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Approve</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : requests
                    ).map((row, index) => (
                        <TableRow key={row.model}>
                            <TableCell style={{ width: 30 }} align="right">
                                {index+1}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="right">
                                {row.model}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.brand.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.year}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <RuleIcon id={row.id} value={row.id} style={{ cursor: 'pointer' }} onClick={(event) => handleApproval(event)} />
                            </TableCell>

                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={requests.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    {modalData && <ApproveModal modalData={modalData} onClose={() => setModalData(undefined)}/>}
        </div>
    );
};

export default RequestsComponent;