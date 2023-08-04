import express from "express";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./routes/authRouter";

const app = express();
app.use(express.json());

app.use(
  session({
    name: "jat_sid",
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: "Session"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

app.use("/api/auth", authRouter);

app.listen(process.env.PORT);
