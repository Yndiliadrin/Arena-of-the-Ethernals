import { IItem, Item } from "../../database/item/itemSchema.js";

export const getItemList = async (req, res) => {
  try {
    const items: Array<IItem> = await Item.find({}, { __v: 0, rarity: 0 });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(200).json([]);
  }
};

/**
 * Returns a random item according to a generated random rarity
 * @param req
 * @param res
 * @returns
 */
export const getRandomFromDatabase = async (req, res) => {
  try {
    const loot = await generateRandomLoot();
    return res.status(200).json(loot);
  } catch (error) {
    return res.status(200).json({});
  }
};

export const generateRandomLoot = async () => {
  try {
    const rarity = Math.floor(Math.random() * (15 - 1) + 1);
    const items: Array<IItem> = await Item.find(
      { rarity: { $lte: rarity } },
      { __v: 0 }
    );
    return items[Math.floor(Math.random() * items.length)];
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
