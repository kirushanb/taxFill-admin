import * as React from 'react';
import "./PriceListItem.scss";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TextField, } from "@mui/material";

export default function PriceListItem({ item }) {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const axiosPrivate = useAxiosPrivate();
    const [price, setPrice] = React.useState(item.price);
    const [loading, setLoading] = React.useState(false);


    const onUpdate = React.useCallback(async (e) => {
        setLoading(true);
        e.preventDefault();
        await axiosPrivate.put("https://tax.api.cyberozunu.com/api/v1.1/Package", {
            ...item, price
        })
        setLoading(false);
    }, [axiosPrivate, item, price]);

    return (
        <form onSubmit={onUpdate}>
            <Item className='item'>
                <ListItem
                    value={item.name}
                    disableGutters
                >
                    <ListItemText primary={`${item.name} Package `} />
                    <TextField
                        id="outlined-size-small"
                        sx={{
                            '& > :not(style)': { m: 1, width: '10ch' },
                        }}
                        type="number"
                        label="price"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        size="small"
                    />
                    <button
                        className="button is-success"
                        disabled={loading}
                    >
                        {loading ? 'Updating' : 'Update'}
                    </button>
                </ListItem>
            </Item>

        </form>
    );
}
