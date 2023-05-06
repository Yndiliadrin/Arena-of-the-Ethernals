import { IItem, Item } from "../../database/item/itemSchema.js";

export const getItemList = async (req, res) => {
  try {
    const items: Array<IItem> = await Item.find({}, { __v: 0 });
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

export const createItem = async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(200).json({ success: true });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(200).json({ success: true });
  }
};

export const updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.body._id);
    
    item.name = req.body.name;
    item.damage = req.body.damage;
    item.defense = req.body.defense;
    item.rarity = req.body.rarity;

    await item.save();
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(200).json({ success: true });
  }
};
