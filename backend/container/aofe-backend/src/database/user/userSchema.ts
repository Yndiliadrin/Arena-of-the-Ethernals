import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { itemSchema } from "../item/itemSchema.js";

const characterSchema = new Schema({
  strenght: {
    type: Number,
    required: true,
    default: 1
  },
  dexterity: {
    type: Number,
    required: true,
    default: 1
  },
  intelligence: {
    type: Number,
    required: true,
    default: 1
  },
  equipment: {
    type: [itemSchema],
    required: true,
    default: [],
  },
  level: {
    type: Number,
    required: true,
    default: 0
  }
});

const Character = mongoose.model("character", characterSchema)

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
    default: new Character()
  },
});


// #3 A user sémájához egy pre-hookot adunk hozzá, amely a mentés előtt fut le
userSchema.pre('save', function(next) {
  const user = this;
  // Ellenőrizzük, hogy a jelszó módosult-e
  if(user.isModified('password')) {
      // Generálunk egy sót a jelszó hash-eléséhez
      bcrypt.genSalt(10, function(err, salt) {
          if(err) {
              console.log('hiba a salt generalasa soran');
              // Ha hiba történik a só generálásakor, akkor visszatérünk a hibával
              return next(err);
          }
          // Hash-eljük a jelszót a sóval
          bcrypt.hash(user.password, salt, function(error, hash) {
              if(error) {
                  console.log('hiba a hasheles soran');
                  // Ha hiba történik a hash-elés során, akkor visszatérünk a hibával
                  return next(error);
              }
              // Beállítjuk a jelszó értékét a hash-re
              user.password = hash;
              user.salt = salt;
              return next();
          })
      })
  } else {
      // Ha a jelszó nem módosult, akkor folytatjuk a mentést
      return next();
  }
});

userSchema.methods.comparePasswords = function(password: string, nx: Function) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      nx(err, isMatch);
  });
};


export const User = mongoose.model("user", userSchema)