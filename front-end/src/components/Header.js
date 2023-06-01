import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const Port = 5000;

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:${Port}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`http://localhost:${Port}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const email = userInfo?.email;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {email && (
          <>
            <Link to="/profile">Profile</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!email && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
