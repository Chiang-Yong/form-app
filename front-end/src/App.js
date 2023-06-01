import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import UserContextProvider from "./components/UserContext";

function App() {
  return (
    <>
      <Navbar />
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
