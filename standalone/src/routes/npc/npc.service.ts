import { Npc } from "../../database/npc/npcSchema.js";

export const getNpcs = (req, res) => {
  res.json(res.npc);
};

/**
 * Creates new NPC in the database
 *
 * @param req
 * @param res
 * @returns
 */
export const createNpc = async (req, res) => {
  try {
    const npc = new Npc(req.body);
    await npc.save();
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(201).json({ success: true });
  }
};

/**
 * Updates the NPC int the database
 * 
 * @param req
 * @param res
 * @returns
 */
export const updateNpc = async (req, res) => {
  try {
    const npc = new Npc(req.body);
    await npc.save();
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(201).json({ success: true });
  }
};

/**
 * Delete NPC record from the database (req.params.id)
 *
 * @param req
 * @param res
 * @returns
 */
export const deleteNpc = async (req, res) => {
  try {
    await Npc.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.error(error);
    return res.status(500);
  } finally {
    return res.status(200).json({ success: true });
  }
};
