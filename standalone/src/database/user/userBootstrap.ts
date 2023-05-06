import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";

// #2 mivel már regisztráltuk, a sémánkat le tudjuk kérni a mongoose-on keresztül is a megfelelő kollekcióra történő hivatkozással
const User = mongoose.model("user", userSchema);

export const ensureAdminExists = async () => {
  try {
    const admin = await User.findOne({ accessLevel: 3 });
    if (admin) {
      console.log("Az admin felhasználó már megtalálható az adatbázisban!");
    } else {
      const newAdmin = new User({
        username: process.env["ADMIN_USER_USERNAME"],
        password: process.env["ADMIN_USER_PASSWORD"],
        accessLevel: 3,
      });
      await newAdmin.save();
      console.log("Az admin felhasználó sikeresen létrehozva!");
    }
  } catch (error) {
    console.error(
      "Hiba történt az admin ellenőrzése vagy létrehozása során: ",
      error
    );
  }
};
