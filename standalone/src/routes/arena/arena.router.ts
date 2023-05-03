import express from "express";
import mongoose from "mongoose";
import { fight } from "./arena.service.js";
import { MAuth } from "./arena.middleware.js";

export const arenaRouter = express.Router();

arenaRouter.post("/fight", MAuth, fight);
