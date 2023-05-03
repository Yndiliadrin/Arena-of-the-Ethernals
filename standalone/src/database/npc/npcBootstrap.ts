import mongoose from "mongoose";
import fs from "fs";
import { INpc, Npc } from "./npcSchema.js";

export const populateNpcCollection = async () => {
  try {
    const npcs: Array<INpc> = JSON.parse(
      fs.readFileSync("src/database/_data/npc.json").toString()
    );

    const databaseNpcs = await Npc.find();

    if (databaseNpcs.length) {
      console.log("The database already contains npcs");
      return;
    }

    await Npc.insertMany(npcs);
  } catch (error) {
    console.error(error);
  }
};
