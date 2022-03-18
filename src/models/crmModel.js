import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  firstName: {
    type: String,
  },
  password: {
    type: String,
  },
});

ContactSchema.set("timestamps", true);
