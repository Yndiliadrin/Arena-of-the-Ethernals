import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface ICharacter {
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  equipment: Array<Schema.Types.ObjectId>;
  inventory: Array<Schema.Types.ObjectId>;
  level: number;
  exp: number;
}

export interface INpc extends ICharacter {
  name: string;
}

const characterSchema = new Schema<ICharacter>({
  strength: {
    type: Number,
    required: true,
    default: 1,
  },
  dexterity: {
    type: Number,
    required: true,
    default: 1,
  },
  intelligence: {
    type: Number,
    required: true,
    default: 1,
  },
  hp: {
    type: Number,
    required: true,
    default: 10,
  },
  equipment: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "items",
    default: [],
  },
  inventory: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "items",
    default: [],
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  exp: {
    type: Number,
    required: true,
    default: 0,
  },
});

const npcSchema = new Schema<INpc>({
  name: {
    type: String,
    required: true,
  },
  ...characterSchema.obj,
});

export const Npc = mongoose.model<INpc>("npc", npcSchema);
export const Character = mongoose.model<ICharacter>(
  "character",
  characterSchema
);

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1,
  },
  character: {
    type: characterSchema,
    default: new Character(),
  },
});

// {
//   equipment: ["644f7bb8565a049ce5b707d2" as unknown as Schema.Types.ObjectId]
// }

// #3 A user sémájához egy pre-hookot adunk hozzá, amely a mentés előtt fut le
userSchema.pre("save", function (next) {
  const user = this;
  // Ellenőrizzük, hogy a jelszó módosult-e
  if (user.isModified("password")) {
    // Generálunk egy sót a jelszó hash-eléséhez
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("hiba a salt generalasa soran");
        // Ha hiba történik a só generálásakor, akkor visszatérünk a hibával
        return next(err);
      }
      // Hash-eljük a jelszót a sóval
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          console.log("hiba a hasheles soran");
          // Ha hiba történik a hash-elés során, akkor visszatérünk a hibával
          return next(error);
        }
        // Beállítjuk a jelszó értékét a hash-re
        user.password = hash;
        user.salt = salt;
        return next();
      });
    });
  } else {
    // Ha a jelszó nem módosult, akkor folytatjuk a mentést
    return next();
  }
});

userSchema.methods.comparePasswords = function (
  password: string,
  nx: Function
) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    nx(err, isMatch);
  });
};

export const User = mongoose.model("user", userSchema);
