import React from 'react'
import './AddNew.scss'
import PackageList from './PackageList'
import { useNavigate } from "react-router-dom";
import PaymentsIcon from '@mui/icons-material/Payments';
import IconButton from '@mui/material/IconButton';

const RouteToPackage = () => {
    const navigate = useNavigate();

    return (
        <div className='RouteToPackage'>
            <IconButton onClick={() => navigate("/packageList")}>
                <PaymentsIcon>
                    <PackageList />
                </PaymentsIcon>
            </IconButton>

        </div>
    )
}

export default RouteToPackage