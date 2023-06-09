import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ensureAdminExists } from "./database/user/userBootstrap.js";

import passport from "passport";
import localStrategy from "passport-local";
import expressSession from "express-session";
import { User, userSchema } from "./database/user/userSchema.js";
import { userRouter } from "./routes/user/user.router.js";
import { status } from "./index.service.js";
import { populateItemsCollection } from "./database/item/itemBootstrap.js";
import { populateNpcCollection } from "./database/npc/npcBootstrap.js";
import { itemRouter } from "./routes/item/item.router.js";
import { arenaRouter } from "./routes/arena/arena.router.js";
import { npcRouter } from "./routes/npc/npc.router.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env["CONNECTION_URL"], {
  dbName: "Arena",
});

export const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

passport.use(
  "local",
  new localStrategy.Strategy(function (username, password, done) {
    User.findOne({ username: username })
      .populate("character.equipment")
      .populate("character.inventory")
      .then((user: any) => {
        if (!user) return done("Nincs ilyen felhasználónév", null);
        user.comparePasswords(password, function (error: any, isMatch: any) {
          if (error) return done(error, false);
          if (!isMatch) return done("Hibas jelszo", false);
          return done(null, user);
        });
      })
      .catch((error) => done("Hiba lekeres soran", null));
  })
);

passport.serializeUser(function (user, done) {
  if (!user) return done("nincs megadva beléptethető felhasználó", null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(
  expressSession({
    secret: "IdonkentArraGondolokHogyMegKelleneHalni",
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/npc", npcRouter);
app.use("/api/item", itemRouter);
app.use("/api/arena", arenaRouter);

app.use("/status", status);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("", express.static(__dirname + "/public"));
app.use("*", express.static(__dirname + "/public"));

app.listen(3000, () => {
  ensureAdminExists();
  populateItemsCollection();
  populateNpcCollection();
  console.log("Server is running on http://localhost:80");
});
