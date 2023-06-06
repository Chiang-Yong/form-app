import React, { Children } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import UserContextProvider from "./components/UserContext";
import Layout from "./components/Layout";
import AuthNavbar from "./components/AuthNavbar";
import Profile from "./pages/Profile";
import { useAuth } from "./components/AuthProvider";

function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const PrivateRoute = ({ auth, children }) => {
    return auth ? children : navigate("/home");
  };

  return (
    <>
      <UserContextProvider> 
        {auth ? <AuthNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<Home />} />
        </Routes>
      </UserContextProvider> 
    </>
  );
}

export default App;
