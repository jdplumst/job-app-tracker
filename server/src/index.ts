import express from "express";
import "dotenv/config";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(process.env.PORT);
