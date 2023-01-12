import * as React from 'react';
import "./RateBand.scss";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ToastContainer } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from '@mui/material/Card';
import {
    Box,
    Container,
    TextField,

} from "@mui/material";

export default function RateBand() {


    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [selectedYear, setSelectedYear] = React.useState('');
    const [data, setData] = React.useState([]);
    const [starter, setStarter] = React.useState(undefined);
    const [base, setBase] = React.useState(undefined);
    const [higher, setHigher] = React.useState(undefined);

    const currentYear = new Date().getFullYear();


    const fetchData = async (year) => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get(`https://tax.api.cyberozunu.com/api/v1.1/RateBandConfiguration/Year/${year}`);
            console.log(response.data.result);
            const list = response.data.result;

            if (list.length > 0) {
                setData(list);
                setStarter(list.find(item => item.rateBand === 1)?.salaryUpTo || undefined);
                setBase(list.find(item => item.rateBand === 2)?.salaryUpTo || undefined);
                setHigher(list.find(item => item.rateBand === 3)?.salaryUpTo || undefined);
                console.log(list.find(item => item.rateBand === 3)?.salaryUpTo || undefined);
                setLoading(false);


            } else {
                setData([]);
                setStarter(undefined);
                setBase(undefined);
                setHigher(undefined);
                setLoading(false);

            }

        } catch (error) {
            console.error(error);
            setLoading(false);

        }
    };

    const handleUpdate = async () => {

        const payLoad = [
            {

                "rateBand": 1,
                "salaryUpTo": starter,
                "year": selectedYear.$y
            },
            {

                "rateBand": 2,
                "salaryUpTo": base,
                "year": selectedYear.$y
            },
            {

                "rateBand": 3,
                "salaryUpTo": higher,
                "year": selectedYear.$y
            }
        ]
        try {
            setLoading(true);

            const response = await axiosPrivate.post('https://tax.api.cyberozunu.com/api/v1.1/RateBandConfiguration',
                payLoad

            );
            setData(response.data);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);

        }
    };

    const handleChange = (date) => {
        setSelectedYear(date);
        fetchData(date.$y);
        console.log(date.$y);
    }

    const axiosPrivate = useAxiosPrivate();
    React.useEffect(() => {
        fetchData(2023);
    }, []);

    return (<div className="RateBand">
        <div className='form'>

            <ToastContainer />
            <Container component="main" maxWidth="lg">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon className="back-icon" />
                    <h5 className="title is-5">Back</h5>
                </div>
                <h3 className='title is-5'>Rate Band</h3>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: "100%",
                }}>

                    <Stack spacing={2}>
                        <List sx={{ width: '50', textAlign: 'left', maxWidth: 700, bgcolor: 'background.paper' }}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <ListItem>
                                    <Typography style={{ paddingRight: "10px" }}>Select a tax year: </Typography>
                                    <DatePicker
                                        views={['year']}
                                        label={'Tax Year'}
                                        value={selectedYear}
                                        onChange={handleChange}
                                        minDate={new Date(0, 0, 1)}
                                        maxDate={new Date(currentYear - 1, 11, 31)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </ListItem>
                                <div>
                                    <Card sx={{ width: '60ch', margin: '4ch' }}>
                                        {!loading && (
                                            <>
                                                <ListItem>
                                                    <ListItemText>Starter</ListItemText>
                                                    <TextField
                                                        sx={{
                                                            '& > :not(style)': { m: 1, width: '20ch' },
                                                        }}
                                                        value={starter}
                                                        onChange={(e) => setStarter(e.target.value)}
                                                        type='number'

                                                    />
                                                    {!starter && (<p
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    >
                                                        *No value added
                                                    </p>) || <p style={{
                                                            color: 'white',
                                                        }}>The value added</p>}
                                                </ListItem>
                                                <ListItem>
                                                    < ListItemText>Base</ListItemText>
                                                    <TextField
                                                        sx={{
                                                            '& > :not(style)': { m: 1, width: '20ch' },
                                                        }}

                                                        value={base}
                                                        onChange={(e) => setBase(e.target.value)}
                                                        type='number'

                                                    />
                                                    {!base && (<p
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    >
                                                        *No value added
                                                    </p>) || <p style={{
                                                            color: 'white',
                                                        }}> The value added</p>}
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText>Higher</ListItemText>
                                                    <TextField
                                                        sx={{
                                                            '& > :not(style)': { m: 1, width: '20ch' },
                                                        }}

                                                        value={higher}
                                                        onChange={(e) => setHigher(e.target.value)}
                                                        type='number'

                                                    />
                                                    {!higher && (
                                                        <p
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            *No value added
                                                        </p>) || <p style={{
                                                            color: 'white',
                                                        }}>The value added</p>}

                                                </ListItem>
                                            </>
                                        )}
                                    </Card>
                                    <p 
                                    style={{
                                        margin:'2ch',
                                        fontSize:'1.7ch',
                                    }}
                                    >*The salary exceeding higer rate band will be considered as additional rate band</p>

                                    <button
                                        className="button is-success"
                                        disabled={loading}
                                        onClick={() => handleUpdate()}
                                        style={{
                                            margin: 'auto',
                                            marginBottom: '10',
                                            marginRight: '0',
                                            display: 'block',
                                            width: '25%',
                                            fontSize: '20px'
                                        }}
                                    >
                                        {loading ? 'Update' : 'Update'}
                                    </button>
                                </div>
                            </LocalizationProvider>
                        </List>
                    </Stack>

                </Box>
            </Container>
        </div>
    </div >
    );
}