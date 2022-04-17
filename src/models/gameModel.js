import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GameSchema = new Schema({
  creatorID: {
    type: String,
  },
  users: [
    {
      email: { type: String },
      points: { type: Number },
      id: { type: String },
    },
  ],
});

GameSchema.set("timestamps", true);
