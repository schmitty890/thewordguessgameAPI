import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
  },
  hashPassword: {
    type: String,
  },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

UserSchema.set("timestamps", true);
