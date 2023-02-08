import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import MoneyIcon from "@mui/icons-material/Money";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PercentIcon from "@mui/icons-material/Percent";
import Tooltip from "@mui/material/Tooltip";

const ToolbarList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <List component="nav" sx={{ padding: 1, marginTop: "1.5rem" }}>
        <ListItemButton
          onClick={() => navigate("/dashboard")}
          selected
          sx={{ borderRadius: "1rem", background: "red" }}
        >
          <Tooltip title="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </Tooltip>

          <ListItemText primary="Dashboard"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/packageList")}>
          <Tooltip title="Packages">
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Packages"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/configuration")}>
          <Tooltip title="Configuration">
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Configuration"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/newUser")}>
          <Tooltip title="New User">
            <ListItemIcon>
              <PersonAddAlt1Icon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="New User"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/changeUserHistory")}>
          <Tooltip title="Customer History">
            <ListItemIcon>
              <ContentPasteSearchIcon />
            </ListItemIcon>
          </Tooltip>

          <ListItemText primary="Customer History"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/rateBand")}>
          <Tooltip title="Rate Band">
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
          </Tooltip>

          <ListItemText primary="Rate Band"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/rateBandPercentage")}>
          <Tooltip title="Rate Band Percentage">
            <ListItemIcon>
              <PercentIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Rate Band Percentage"></ListItemText>
        </ListItemButton>
      </List>
    </div>
  );
};

export default ToolbarList;
