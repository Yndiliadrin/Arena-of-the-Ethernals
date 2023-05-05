import express from "express";
import mongoose from "mongoose";
import { MGetNpcs } from "./npc.middleware.js";
import { createNpc, deleteNpc, getNpcs, updateNpc } from "./npc.service.js";
import { MAdminAuth } from "../arena/arena.middleware.js";

const Npc = mongoose.model("npc");

export const npcRouter = express.Router();

npcRouter.get("/" , MGetNpcs, getNpcs);
npcRouter.post("/", MAdminAuth, createNpc);
npcRouter.patch("/", MAdminAuth, updateNpc);
npcRouter.delete("/:id", MAdminAuth, deleteNpc);
