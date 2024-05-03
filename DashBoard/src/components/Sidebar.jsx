import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { TiUserAdd } from "react-icons/ti";
import { PiUserListFill } from "react-icons/pi";
import { TbNewSection } from "react-icons/tb";
import { PiNewspaperDuotone } from "react-icons/pi";
import { BiLogOutCircle } from "react-icons/bi";
import '../index.css';

import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5000/api/v1/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoAddUser = () => {
    navigateTo("/admin/addUser");
    setShow(!show);
  };
  const gotoListUser = () => {
    navigateTo("/ListUser");
    setShow(!show);
  };
  const gotoAddNews = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  const gotoListNews = () => {
    navigateTo("/ListNews");
    setShow(!show);
  };

  return (
    <>
  <nav
  style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
  className={show ? "show sidebar" : "sidebar"}
>
  <div className="links flex flex-col">
    <div className="link flex flex-col items-center" onClick={gotoHomePage}>
      <TiHome className="text-gray-600" />
      <p className="text-xs  text-gray-600">Home</p>
    </div>
    <div className="link flex flex-col items-center" onClick={gotoAddUser}>
      <TiUserAdd className="text-gray-600" />
      <p className="text-xs  text-gray-600">Add User</p>
    </div>
    <div className="link flex flex-col items-center" onClick={gotoListUser}>
      <PiUserListFill className="text-gray-600" />
      <p className="text-xs text-gray-600">User List</p>
    </div>
    <div className="link flex flex-col items-center" onClick={gotoAddNews}>
      <TbNewSection className="text-gray-600" />
      <p className="text-xs text-gray-600">Add News</p>
    </div>
    <div className="link flex flex-col items-center" onClick={gotoListNews}>
      <PiNewspaperDuotone className="text-gray-600" />
      <p className="text-xs text-gray-600">List News</p>
    </div>
    <div className="link flex flex-col items-center" onClick={handleLogout}>
      <BiLogOutCircle className="text-gray-600" />
      <p className="text-xs text-gray-600">Logout</p>
    </div>
  </div>
</nav>


      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
