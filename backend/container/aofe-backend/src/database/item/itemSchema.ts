import mongoose, { Schema } from "mongoose";

export interface IItem {
  name: string;
  slot: string;
  defense: number;
  damage: number;
}

export const itemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slot: {
    type: String,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
    default: 0,
  },
  damage: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Item = mongoose.model<IItem>("item", itemSchema);