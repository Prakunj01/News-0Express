import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddNews from "./pages/AddNews";
import AddUser from "./pages/AddUser";
import EditNews from "./pages/EditNews";
import ListNews from "./pages/ListNews";
import ListUser from "./pages/ListUser";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/admin/alluser",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/addnew" element={<AddNews />} />
        <Route path="/admin/addUser" element={<AddUser />} />
        <Route path="/listNews" element={<ListNews />} />
        <Route path="/listUser" element={<ListUser />} />
        <Route path="/editNews/:id" element={<EditNews />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
