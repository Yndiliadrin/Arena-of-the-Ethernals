import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ensureAdminExists } from "./database/user/userBootstrap.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect("mongodb://database");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

ensureAdminExists();

app.use((req: any, res: any, next: any) => {
  console.log("A middleware futott!");
  next();
});

app.use("/", (req: any, res: any) => {
  res.send("ok");
});

app.use("", express.static("public"));

app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});
