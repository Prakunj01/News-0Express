import express from "express";
import {
//   addNewAdmin,
  addnewuser,
  getAllWriter,
  getUserDetails,
  userlogin,
  deleteUser,
  logoutAdmin,
  userRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userlogin);

// router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/admin/addnew", isAdminAuthenticated, addnewuser);

router.get("/writer", getAllWriter);
router.get("/admin/alluser", isAdminAuthenticated, getUserDetails);
router.delete("/admin/user/:userId", isAdminAuthenticated, deleteUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
