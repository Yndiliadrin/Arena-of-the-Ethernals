import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface ICharacter {
  _id: string;
  hp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  equipment: Array<Schema.Types.ObjectId>;
  inventory: Array<Schema.Types.ObjectId>;
  level: number;
  exp: number;
}

export const characterSchema = new Schema<ICharacter>({
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

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("hiba a salt generalasa soran");
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          console.log("hiba a hasheles soran");
          return next(error);
        }
        user.password = hash;
        user.salt = salt;
        return next();
      });
    });
  } else {
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
