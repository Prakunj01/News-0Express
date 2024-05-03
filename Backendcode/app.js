import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import newsRouter from "./router/newsRouter.js";
import userRouter from "./router/userRouter.js";
// import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config/.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/", newsRouter);
app.use("/api/v1/", userRouter);
// app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
