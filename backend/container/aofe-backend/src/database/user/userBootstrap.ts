import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";

// #2 mivel már regisztráltuk, a sémánkat le tudjuk kérni a mongoose-on keresztül is a megfelelő kollekcióra történő hivatkozással
const User = mongoose.model("user", userSchema);

export const ensureAdminExists = async () => {
  try {
    // Ellenőrizzük, van-e már admin felhasználó az adatbázisban
    const admin = await User.findOne({ accessLevel: 3 }); //a findOne-nal jelezzük, hogy pontosan egy darab usert keresünk
    if (admin) {
      //ha kaptunk vissza objektumot, akkor ez a feltétel igazra teljesül, ha üres/undefine, akkor hamisra
      console.log("Az admin felhasználó már megtalálható az adatbázisban!");
    } else {
      // Ha nincs, akkor létrehozunk egy újat
      const newAdmin = new User({
        username: "admin",
        password: "admin123",
        salt:"asdasd",
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