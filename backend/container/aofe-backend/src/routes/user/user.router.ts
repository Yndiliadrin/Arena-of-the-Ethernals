import express from "express";
import mongoose from "mongoose";
import { login, logout, regiszt, user_status } from "./user.auth.service.js";
import { MGetUsers, getUser } from "./user.middleware.js";
import { getUsers } from "./user.service.js";

const User = mongoose.model("user");

export const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter.route("/logout").post(logout);

userRouter.route("/status").get(user_status);

userRouter.route("/").post(regiszt);

userRouter.get("/" , MGetUsers, getUsers);

// GET /users - összes felhasználó lekérdezése
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - egy felhasználó lekérdezése az id alapján
userRouter.get("/:id", getUser, (req, res: any) => {
  //ez is egy middleware használati módszer,
  // a getUser middleware ilyenkor le fog futni a kérés feldolgozása előtt
  res.json(res.user); //egyszerűsített válaszküldés, a megadott objektumot json-re konvertálva küldjük el
});

// PATCH /users/:id - egy felhasználó frissítése az id alapján
// TODO: refactorit
userRouter.patch("/:id", getUser, async (req, res: any) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }
  if (req.body.birthdate != null) {
    res.user.birthdate = req.body.birthdate;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - egy felhasználó törlése az id alapján
userRouter.delete("/:id", getUser, async (req, res: any) => {
  try {
    await User.deleteOne({ _id: res.user._id });
    res.json({ message: "A felhasználó sikeresen törölve!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
