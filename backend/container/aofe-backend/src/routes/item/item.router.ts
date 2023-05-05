import express from "express";
import { MAdminAuth, MAuth } from "../arena/arena.middleware.js";
import { createItem, deleteItem, getItemList, getRandomFromDatabase } from "./item.service.js";

export const itemRouter = express.Router();

itemRouter.get("/", MAuth, getItemList);
itemRouter.get("/loot", MAuth, getRandomFromDatabase);

itemRouter.post("/", MAdminAuth, createItem);
itemRouter.delete("/:id", MAdminAuth, deleteItem);