import * as React from 'react';
import "./PackageList.scss";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ToastContainer, toast } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import {
    Box,
    Container,
    TextField,

} from "@mui/material";

export default function PackageList() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();

    return (<div className="PackageList">
        <form>
            <ToastContainer />
            <Container component="main" maxWidth="lg">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon className="back-icon" />
                    <h5 className="title is-5">Back</h5>
                </div>
                <h3 className='title is-5'>Price of pakcages</h3>

                <Box sx={{
                    // marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: "100%",
                }}                >
                    <Stack spacing={2}>
                        <List sx={{ width: '50', textAlign: 'left', maxWidth: 480, bgcolor: 'background.paper' }}>
                            {["Employment",
                                "Self employment",
                                "Pension Income",
                                "Partnership",
                                "Rental Income",
                                "Dividend",
                                "Bank interest",
                            ].map((value) => (
                                <Item className='item'>
                                    <ListItem
                                        key={value}
                                        disableGutters

                                    >
                                        <ListItemText fullwidth primary={`${value} Package `} />
                                        <TextField id="outlined-size-small"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '10ch' },
                                            }}
                                            label="price"
                                            size="small"
                                        />
                                        <button className="button is-success"  >
                                            Update
                                        </button>
                                    </ListItem>
                                </Item>
                            ))}
                        </List>
                    </Stack>

                </Box>
            </Container>
        </form>
    </div>
    );
}
