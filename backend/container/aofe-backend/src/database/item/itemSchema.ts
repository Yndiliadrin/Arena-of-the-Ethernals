import mongoose, { Schema } from "mongoose";

export interface IItem {
  name: string;
  slot: string;
  defense: number;
  damage: number;
  rarity: number;
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
  rarity: {
    type: Number,
    required: true,
    default: 1,
  },
});

itemSchema.pre("save", function (next) {
  const item = this;

  if (item.rarity === -1) {
    item.rarity = Math.floor(Math.random() * 50 + 1);
    return next();
  } else return next();
});

export const Item = mongoose.model<IItem>("items", itemSchema);
