import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddUser = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const navigateTo = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:5000/api/v1/admin/addnew",
          { name, phone, email, password, role },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setName("");
          setPhone("");
          setEmail("");
          setPassword("");
          setRole("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
      <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">ADD NEW USER</h1>
        <form onSubmit={handleAddUser}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
              <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="writer">Writer</option>
            </select>
        
          </div>
    
          <div>
       
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW USER</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddUser;
