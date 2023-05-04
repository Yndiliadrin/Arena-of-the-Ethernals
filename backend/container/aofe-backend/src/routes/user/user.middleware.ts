import { User } from "../../database/user/userSchema.js";
import { NextFunction } from "express";

export async function getUser(req, res, next) {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  if (
    req.user.accessLevel !== 3 &&
    req.route.path === "/:id" &&
    req.method === "DELETE"
  )
    return res.status(499).json({ message: "Unauthorized" });
  let user = null;
  try {
    user = await User.findById(req.params.id, {
      _id: 0,
      __v: 0,
      password: 0,
      salt: 0,
      "character._id": 0,
    })
      .populate("character.equipment")
      .populate("character.inventory");
    if (user == null) {
      return res.status(404).json({ message: "A felhasználó nem található" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    res.user = user;
    next();
  }
}

export const MGetUserForUpdate = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  let user = null;
  try {
    user = await User.findById(req.params.id)
      .populate("character.equipment")
      .populate("character.inventory");
    if (user == null) {
      return res.status(404).json({ message: "A felhasználó nem található" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    console.log(user);
    res.user = user;
    next();
  }
};

export async function MGetUsers(req, res, next) {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  let user = null;
  try {
    user = await User.find(
      {},
      {
        __v: 0,
        password: 0,
        salt: 0,
        accessLevel: 0,
        "character._id": 0,
      }
    )
      .populate("character.equipment")
      .populate("character.inventory");
    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no user in the database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    res.user = user;
    next();
  }
}
