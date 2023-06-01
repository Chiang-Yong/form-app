import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import "./navbar.css";

const pages = [
  { title: "Products", link: "/Products" },
  { title: "Blog", link: "/Blog" },
  { title: "About Us", link: "/About" },
  { title: "Log In", link: "/Login" },
  { title: "Join for Free", link: "/register" },
];

const Navbar = ({ toggle }) => {
  return (
    <nav className="navbar">
      <Diversity1Icon sx={{ display: { xs: "none", md: "flex" }, ml: 3 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          ml: 1,
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "black",
          textDecoration: "none",
        }}
      >
        HCY 
      </Typography>
      <Box className="menu" >
        {pages.map((page, index) => (
          <div key={index}>
            {index <= 3 ? (
              <Button
                href={page.link}
                sx={{ mr: 5, color: "black", display: "block" }}
                className="menu-text"
              >
                <Link to={page.link} className="link menu-text">
                  {page.title}
                </Link>
              </Button>
            ) : (
              <Button
                href={page.link}
                className="navbtn"
                sx={{ ml: 5, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            )}
          </div>
        ))}
      </Box>
    </nav>
  );
};

export default Navbar;
