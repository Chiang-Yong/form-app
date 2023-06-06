import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Navbar from "./Navbar";
import AuthNavbar from "./AuthNavbar";
import Products from "../pages/Products";

//const port = 4000;

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: "include",
      
    }).then((response) => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`http://localhost:4000/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const email = userInfo?.email;

  return (
    <header>
     {/*  <Link to="/" className="logo">
        HCY
      </Link> */}
      <nav>
        {email && (
          <>
            <Link to="/profile">Profile</Link>
            <a onClick={logout}>Logout ({email})</a>
          </>
        )}
        {!email && (
          <>
            <Navbar />
            
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
