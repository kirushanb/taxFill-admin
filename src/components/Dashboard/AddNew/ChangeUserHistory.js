import * as React from 'react';
import "./PackageList.scss";
import { ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Stack from '@mui/material/Stack';
import { Box, Container } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import { useMemo } from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';

export default function ChangeUserHistory() {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();
    const [getData, setGetData] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState('')
    console.log("search",search)

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const axiosPrivate = useAxiosPrivate();

    const getCustomerHistory = async () => {
        try {
            const response = await axiosPrivate.get("https://tax.api.cyberozunu.com/api/v1.1/CustomerDetailChangeHistory");
            setGetData(response.data?.result?.data);
            console.log("data", response.data?.result?.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getCustomerHistory();
    }, []);

    const genaratedTable = useMemo(() => {

        const iniIndex = page * rowsPerPage;
        const secIndex = iniIndex + rowsPerPage

        return getData.slice(iniIndex, secIndex)

    }, [getData, page, rowsPerPage]);

    return (
        <div className="PackageList">
            <div className='form'>
                <ToastContainer />
                <Container component="main" maxWidth="lg">

                    <div className="back-button" onClick={() => navigate(-1)}>
                        <ArrowBackIosNewIcon className="back-icon" />
                        <h5 className="title is-5">Back</h5>
                    </div>
                    <h3 className='title is-5'>Custormer History</h3>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />


                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        width: "100%",
                    }}>

                        <Stack spacing={1}>
                            <List sx={{ width: '50', textAlign: 'left', maxWidth: 700, bgcolor: 'background.paper' }}>

                                {genaratedTable.filter((singleData)=>{
                                    return search.toLowerCase() === '' ?
                                     singleData : singleData.customer.firstName.toLowerCase().includes(search) || singleData.customer.lastName.toLowerCase().includes(search);
                                }).map((singleData, index) => (
                                    <Table>
                                        <Item className='item'>
                                            <ListItem
                                                key={singleData.id}
                                                disableGutters>

                                                <ListItemText sx={{ fontSize: 19 }}
                                                    disableTypography
                                                    primary={<>{index + 1}{`. `}{singleData.customer.firstName}{` `}
                                                        {singleData.customer.lastName}
                                                        {` has changed the ${singleData.propertyName} `}
                                                        <span style={{ fontWeight: 'bold' }}>{singleData.oldValue} </span>{`to `}
                                                        <span style={{ fontWeight: 'bold' }}>{singleData.newValue}</span>{` on `}
                                                        {moment(singleData.modifiedOn).format('DD.MM.YYYY - HH:mm:ss')}
                                                        </>}
                                                />
                                            </ListItem>
                                        </Item>
                                    </Table>

                                ))}


                            </List>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={getData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}

                            >

                            </TablePagination>
                        </Stack>
                    </Box>
                </Container>

            </div>
        </div >
    );
}
