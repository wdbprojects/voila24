import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import errorMiddleware from "./middlewares/errors.js";
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { fileURLToPath } from "url";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ADD OWN PROXY TO PREVENT CORS ERROR */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/* DB URI */
let DB_URI = "";
if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_PROD_URI;

/* HANDLE UNCAUGHT EXECEPTIONS */
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to Uncaught Exception");
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
/* COOKIE PARSER */
app.use(cookieParser());

/* ROUTES */
app.use("/api/v1", productRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

/* ERROR MIDDLEWARE */
app.use(errorMiddleware);

const serverConnect = async () => {
  try {
    await connectDB(DB_URI);
    const server = app.listen(process.env.PORT, () => {
      console.log(
        `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
      );
      /* HANDLE UNHANDLED PROMISE REJECTION */
      process.on("unhandledRejection", (err) => {
        console.log(`ERROR: ${err}`);
        console.log("Shutting down server due to Unhandled Promise Rejection");
        server.close(() => {
          process.exit(1);
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

serverConnect();
