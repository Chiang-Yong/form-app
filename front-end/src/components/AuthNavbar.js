import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Box,
  Button,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import React, { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
//import { Link } from "react-router-dom";
import Link from '@mui/material/Link';
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "./UserContext";

const pages = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Programs", path: "/programs" },
];
const admin = [
  { title: "Profile", icon: <Avatar fontSize="small" />,path:"/profile" },
  { title: "Add account", icon: <PersonAdd fontSize="small" />,path:"/addAccount" },
  { title: "Settings", icon: <Settings fontSize="small" />,path:"/settings" },
  { title: "Logout", icon: <Logout fontSize="small" />, path:"logout" },
];

const accounts = [
  { title: "Profile", icon: <Avatar fontSize="small" />,path:"/profile" },
  { title: "Settings", icon: <Settings fontSize="small" />,path:"/settings" },
  { title: "Logout", icon: <Logout fontSize="small" />, path:"logout" },
];

const AuthNavbar = () => {
  const { setAuth, user } = useAuth();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async ()=> {
    const res = await Axios.get(
      "http://localhost:4000/logout",
      {withCredentials: true}
    )
    console.log(res.data)
    setAuth(false)
    setUserInfo("")
    navigate("/login")
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, zIndex:20, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={page.path} underline="none" sx={{ my: 2, color: "white", }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.path} underline="none" sx={{ my: 2, color: "white", display: "block" }}>
                {page.title}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo.lastName} src="/static/images/avatar/2.jpg" />
              </IconButton>             
            </Tooltip>
            <Typography>{userInfo.firstName}, {userInfo.roles[0]}</Typography>
           { console.log("user data: " + JSON.stringify(userInfo)) }
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              {(userInfo.roles[0] === "admin") ? (
              
                <>
                {admin.map((account) => (
                <MenuItem key={account} onClick={handleCloseUserMenu}>
                  <ListItemIcon>{account.icon}</ListItemIcon>
                  <Link href={account.path} underline="none" >
                  <Typography textAlign="center">{account.title}</Typography>
                  </Link>
                </MenuItem>
                
              ))}
              </>)
              :(
                <>
                {accounts.map((account) => (
                <MenuItem key={account} onClick={handleCloseUserMenu}>
                  <ListItemIcon>{account.icon}</ListItemIcon>
                  <Link href={account.path} underline="none" >
                  <Typography textAlign="center">{account.title}</Typography>
                  </Link>
                </MenuItem>
               ))}
               </>
               )

}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthNavbar;
