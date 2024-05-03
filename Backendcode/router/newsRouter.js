import express from "express";
import {
  addnews,
  updateNews,
  deleteNews,
  getNewsById,
  getAllNews
} from "../controller/newsController.js";

import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/news/add",isAdminAuthenticated, addnews);
router.put("/news/update/:id",isAdminAuthenticated, updateNews);
router.delete('/news/delete/:news_id', isAdminAuthenticated, deleteNews)

// router.get("/news", isAdminAuthenticated, getAllNews);
router.get("/news", getAllNews);
// router.get('/news/:news_id', isAdminAuthenticated, getNewsById)
router.get('/news/:news_id', getNewsById)

export default router;


// router.get('/api/images', middleware.auth, newsController.get_images)
// router.post('/api/images/add', middleware.auth, newsController.add_images)

