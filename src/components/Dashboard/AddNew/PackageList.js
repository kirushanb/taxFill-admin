import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ToastContainer, toast } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate,useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
    Box,
    Container,
    TextField,
   
} from "@mui/material";

export default function PackageList() {

    const navigate = useNavigate();

    return (<div className="BankInterest">
        <form>
            <ToastContainer />
            <Container component="main" maxWidth="lg">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon className="back-icon" />
                    <h5 className="title is-5">Back</h5>
                </div>
                <h3 className='title is-5' >Update the price of pakcages</h3>

                <Box sx={{
                    // marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                }}

                >
                    <List className='title is-5' sx={{ width: '50', textAlign: 'left', maxWidth: 480, bgcolor: 'background.paper' }}>
                        {[  "Employment",
                            "Self employment",
                            "Pension Income",
                            "Partnership",
                            "Rental Income",
                            "Dividend",
                            "Bank interest",
                        ].map((value) => (
                            <ListItem
                                key={value}
                                disableGutters

                            >
                                <ListItemText primary={`${value} Package `} />
                                <TextField id="outlined-basic"
                                    sx={{
                                        '& > :not(style)': { m: 2, width: '10ch',height:'5ch' },
                                    }} label="price" variant="outlined" />
                                <button className="button is-success"  >
                                    Update
                                </button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Container>
        </form>
    </div>
    );
}
