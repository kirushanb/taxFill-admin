import * as React from 'react';
import "./ConfigurationList.scss";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


import {
    Box,
    Container,
    TextField,

} from "@mui/material";

export default function ConfigurationList() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [selectedPackage, setSelectedPackage] = React.useState()
    const [packages, setPackages] = React.useState([
        {
            name: "Personal Allowance Limit",
            id: 1,
            value: null
        },
        {
            name: "Class2 NIC",
            id: 2,
            value: null
        },
        {
            name: "Capital Gain Allowance",
            id: 3,
            value: null
        },
        {
            name: "Internet Processing Fee",
            id: 4,
            value: null
        },
    ]);

    const axiosPrivate = useAxiosPrivate();

    const getPackage = async () => {
        try {
            const arrPromise = packages.map(selectedPackage => axiosPrivate.get
                (`https://tax.api.cyberozunu.com/api/v1.1/Configuration/configuration?configType=${selectedPackage.id}`))

            const responses = await Promise.all(arrPromise)
            const filteredResponses = responses.map(response => response.data.result)

            const updatedPackages = packages.map((selectedPackage, index) => {
                return {
                    ...selectedPackage,
                    value: filteredResponses[index]

                }

            })
            setPackages(updatedPackages)
            console.log(updatedPackages);

        }
        catch (err) {
            console.log(err);
        }

    }

    const handleEdit = async (selectedPackage) => {
        setSelectedPackage(selectedPackage)

        try {
            setLoading(true);
            await axiosPrivate.put
                (`https://tax.api.cyberozunu.com/api/v1.1/Configuration/configuration?configType=${selectedPackage.id}&value=${selectedPackage.value}`)
            setLoading(false);

            console.log(selectedPackage);

        }
        catch (err) {
            console.log(`Error: ${err.message}`);
            getPackage()
            setLoading(false)

        }
    }
    React.useEffect(() => {
        getPackage()
    }, []);

    const onTextChange = (value, index) => {
        let updatedPackages = [...packages];
        updatedPackages[index].value = value;
        setPackages(updatedPackages);

    }

    return (<div className="ConfigurationList">
        <form >
            <ToastContainer />
            <Container component="main" maxWidth="lg">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon className="back-icon" />
                    <h5 className="title is-5">Back</h5>
                </div>
                <h3 className='title is-5'>Configuration</h3>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: "100%",
                }}>

                    <Stack spacing={2}>
                        <List sx={{ width: '50', textAlign: 'left', maxWidth: 700, bgcolor: 'background.paper' }}>
                            {packages.map((singlePackage, index) => (
                                <Item className='item'>
                                    <ListItem
                                        key={singlePackage.id}
                                        disableGutters>

                                       <ListItemText primary={`${singlePackage.name} Package `} />
                                        <TextField
                                            id="outlined-size-small"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '10ch' },
                                            }}
                                            type="number"
                                            label="price"
                                            size="small"
                                            value={singlePackage.value}
                                            onChange={(e) => onTextChange(e.target.value, index)}
                                        />
                                        <button
                                            type='submit'
                                            onClick={() => handleEdit(singlePackage)}
                                            className="button is-success"
                                            disabled={loading && selectedPackage.id === singlePackage.id}
                                        >
                                           
                                            {loading && selectedPackage.id === singlePackage.id ? 'Updating' : 'Update'}
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