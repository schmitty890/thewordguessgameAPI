import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const SubscribeSchema = new Schema({
  email: {
    type: String,
  },
});

SubscribeSchema.set("timestamps", true);
