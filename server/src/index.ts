import express from "express";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import applicationRouter from "./routes/applicationRouter";
import cors from "cors";

const app = express();
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      process.env.DEV_CLIENT_URL as string,
      process.env.PROD_CLIENT_URL as string
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
  })
);

app.use(
  session({
    name: "jat_sid",
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: "Session"
    }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_SERVER_URL
          : process.env.DEV_SERVER_URL,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);

app.listen(process.env.PORT);
