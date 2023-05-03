import mongoose, { Schema } from "mongoose";
import { ICharacter, characterSchema } from "../user/userSchema.js";

export interface INpc extends ICharacter {
  name: string;
}

const npcSchema = new Schema<INpc>({
  name: {
    type: String,
    required: true,
  },
  ...characterSchema.obj,
});

export const Npc = mongoose.model<INpc>("npc", npcSchema);
