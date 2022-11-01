import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import MoneyIcon from '@mui/icons-material/Money';
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';



const ToolbarList = () => {
    const navigate = useNavigate();
    return (
        <div>
            <List component="nav" sx={{ padding: 1, marginTop: "1.5rem" }}>
                <ListItemButton onClick={() => navigate("/dashboard")}
                 selected sx={{ borderRadius: "1rem", background: "red" }}>
                    <ListItemIcon >
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" >
                    </ListItemText>
                </ListItemButton>

                <ListItemButton 
                  onClick={() => navigate("/packageList")}>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Packages">
                    </ListItemText>
                </ListItemButton>

                <ListItemButton  onClick={() => navigate("/configuration")}>
                    <ListItemIcon>
                        <MoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configuration" >
                    </ListItemText>
                </ListItemButton>

            <ListItemButton  onClick={() => navigate("/newUser")}>
                    <ListItemIcon>
                        <PersonAddAlt1Icon />
                    </ListItemIcon>
                    <ListItemText primary="New User" >
                    </ListItemText>
                </ListItemButton>

            <ListItemButton  onClick={() => navigate("/changeUserHistory")}>
                    <ListItemIcon>
                        <ContentPasteSearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customer History" >
                    </ListItemText>
                </ListItemButton>
            </List>


        </div>
    )
}

export default ToolbarList
