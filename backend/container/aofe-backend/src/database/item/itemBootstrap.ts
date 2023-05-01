import mongoose from "mongoose";
import fs from "fs";
import { Item, IItem } from "./itemSchema.js";

export const populateItemsCollection = async () => {
  try {
    const items: Array<IItem> = JSON.parse(
      fs.readFileSync("src/database/_data/items.json").toString()
    );

    const databaseItems = await Item.find();
    
    if (!databaseItems) {
        console.log("The database already contains items")
        return;
    } 

    await Item.insertMany(items);

  } catch (error) {
    console.error(error);
  }
};
