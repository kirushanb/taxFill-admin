import * as React from 'react';
import "./PackageList.scss";
import { ToastContainer} from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Stack from '@mui/material/Stack';
import { Box,Container} from "@mui/material";
import PriceListItem from './PriceListItem';

export default function PackageList() {

    const navigate = useNavigate();
    const [packages, setPackages] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getPackage = async () => {
        try {
            const response = await axiosPrivate.get("https://tax.api.cyberozunu.com/api/v1.1/Package");
            setPackages(response.data?.result?.data);
            console.log("data", response.data?.result?.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getPackage();
    }, []);


    return (
    <div className="PackageList">
        <div className='form'>
            <ToastContainer />
            <Container component="main" maxWidth="lg">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon className="back-icon" />
                    <h5 className="title is-5">Back</h5>
                </div>
                <h3 className='title is-5'>Price of pakcages</h3>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: "100%",
                }}>

                    <Stack spacing={1}>
                            {packages.map((item) => (
                                <PriceListItem
                                 item={item}
                                 key ={item.id}
                                 />
                            ))}
                            
                    </Stack>

                </Box>
            </Container>
    </div>
    </div>
    );
}
