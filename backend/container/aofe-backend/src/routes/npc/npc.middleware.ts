import { Npc } from "../../database/npc/npcSchema.js";

export const MGetNpcs = async (req, res, next) => {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  let npcs = null;

  try {
    npcs = await Npc.find({}, { __v: 0 }).populate("equipment");
    if (!npcs) {
      return res
        .status(404)
        .json({ message: "There is no npc in the database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    res.npc = npcs;
    next();
  }
};
