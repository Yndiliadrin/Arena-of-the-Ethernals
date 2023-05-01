import { User } from "../../database/user/userSchema.js";

export const getUsers = (req, res) => {
  res.json(res.user);
};

export const updateUser = async (req, res) => {
  // Ettől a kódtól itt hányhatnékom van :/
  // #region
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }
  if (req.body.salt != null) {
    res.user.salt = req.body.salt;
  }

  if (req.body.character.hp !== null)
    res.user.character.hp = req.body.character.hp;
  if (req.body.character.strength !== null)
    res.user.character.strength = req.body.character.strength;
  if (req.body.character.dexterity !== null)
    res.user.character.dexterity = req.body.character.dexterity;
  if (req.body.character.intelligence !== null)
    res.user.character.intelligence = req.body.character.intelligence;
  if (req.body.character.equipment !== null)
    res.user.character.equipment = req.body.character.equipment;
  if (req.body.character.inventory !== null)
    res.user.character.inventory = req.body.character.inventory;
  if (req.body.character.level !== null)
    res.user.character.level = req.body.character.level;
  if (req.body.character.exp !== null)
    res.user.character.exp = req.body.character.exp;
  // #endregion

  try {
    const tmp = await res.user.save();
    const updatedUser = await User.find({ _id: tmp._id }, {__v: 0, "character.__v":0})
      .populate("character.equipment")
      .populate("character.inventory");
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
