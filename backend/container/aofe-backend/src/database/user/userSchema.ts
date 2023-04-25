import { Schema } from "mongoose";

import { itemSchema } from "../item/itemSchema.js";

const characterSchema = new Schema({
  strenght: {
    type: Number,
    required: true,
  },
  dexterity: {
    type: Number,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
  equipment: {
    type: [itemSchema],
    required: true,
    default: [],
  },
});

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1,
  },
  character: {
    type: characterSchema,
    required: true,
  },
});
