import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToolbarList from "./AddNew/ToolbarList";
import lottie from "lottie-web";
import loadingAnim from '../../static/working.json';
import { useState } from "react";
import RateBand  from "./AddNew/RateBand";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true)



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };



  const handleLogout = () => {
    // toast("User Logged Out Successfully");
    setAuth({});
    setCookie("user", "", {
      path: "/"
    });
   window.location.href='/'
  }

  React.useEffect(() => {
    const element = document.querySelector("#loading");
    if (element) {
      lottie.loadAnimation({
        container: element,
        animationData: loadingAnim,
        renderer: "svg", // "canvas", "html"
        loop: true, // boolean
        autoplay: true, // boolean
      });
    }
  }, [loading]);

  React.useEffect(() =>{
    const loadPage = async() => {
      await new Promise((r) => setTimeout(r,2000));

      setLoading((loading) => !loading);
    }
    loadPage()

  },[])

 
  return (
    <React.Fragment>
    <ToastContainer />
   {loading?<React.Fragment>{loading && <div className="Login">
     <div id="loading" className="loading" />
     </div>}</React.Fragment>:
    <>
      <Box sx={{ display: "flex" }}>
      <ToastContainer />
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          style={{ background: "#2a2d3e" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
            
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, cursor:"pointer" }}
                onClick={()=> navigate('/')}
              >
                TaxFill
              </Typography>
            }
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                   {/* <MenuItem onClick={handleProfile}>Profile</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar> 
        
        <Drawer variant="permanent" open={open} style={{ border: "#2a2d3e" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
            style={{ background: "#2a2d3e", borderColor: "#2a2d3e" }}
          >
           
            <IconButton onClick={toggleDrawer} onMouseEnter={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar> 
          <ToolbarList />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <RateBand/>

        </Box>
      </Box>
    </>}
    </React.Fragment>
  );
}

export default function RateBandLayout() {
  return <DashboardContent />;
}
