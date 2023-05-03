import express from "express";
import { MAuth } from "../arena/arena.middleware.js";
import { getItemList, getRandomFromDatabase } from "./item.service.js";

export const itemRouter = express.Router();

itemRouter.get("/", MAuth, getItemList);
itemRouter.get("/loot", MAuth, getRandomFromDatabase);
