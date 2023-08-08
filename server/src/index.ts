import express from "express";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./routes/authRouter";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.DEV_CLIENT_URL as string,
      process.env.PROD_CLIENT_URL as string
    ]
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
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

app.use("/api/auth", authRouter);

app.listen(process.env.PORT);
