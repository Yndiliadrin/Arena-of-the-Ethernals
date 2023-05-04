import express from "express";
import mongoose from "mongoose";
import { MGetNpcs } from "./npc.middleware.js";
import { getNpcs } from "./npc.service.js";

const Npc = mongoose.model("npc");

export const npcRouter = express.Router();

npcRouter.get("/" , MGetNpcs, getNpcs);

// npcRouter.patch("/:id", MGetNpcForUpdate, updateNpc);

// // DELETE /users/:id - egy felhasználó törlése az id alapján
// npcRouter.delete("/:id", MGetNpc, async (req, res: any) => {
//   try {
//     await Npc.deleteOne({ _id: res.user._id });
//     res.json({ message: "A felhasználó sikeresen törölve!" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
