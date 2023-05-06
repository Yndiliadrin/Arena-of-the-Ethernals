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
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "A felhasználó nem található" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    res.user = user;
    next();
  }
};

export async function MGetUsers(req, res, next) {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  let user = null;
  try {
    user = await User.find(
      { _id: { $ne: req.user._id } },
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

export const MGetUserList = async (req, res, next) => {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  if (req.user.accessLevel !== 3)
    return res.status(499).json({ message: "Unauthorized" });
  let user = null;
  try {
    user = await User.find(
      {},
      {
        __v: 0,
        password: 0,
        salt: 0,
        character: 0,
      }
    );
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
};
