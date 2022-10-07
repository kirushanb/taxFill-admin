import React from 'react'
import './AddNew.scss'
import ConfiguratonList from './ConfigurationList'
import { useNavigate } from "react-router-dom";
import PaymentsIcon from '@mui/icons-material/Payments';
import IconButton from '@mui/material/IconButton';

const RouteToConfig = () => {
    const navigate = useNavigate();

    return (
        <div className='RouteToPackage'>
            <IconButton onClick={() => navigate("/configuration")}>
                <PaymentsIcon>
                    <ConfiguratonList />
                </PaymentsIcon>
            </IconButton>

        </div>
    )
}

export default RouteToConfig