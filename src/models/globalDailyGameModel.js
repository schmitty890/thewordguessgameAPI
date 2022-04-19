import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GlobalDailyGameSchema = new Schema({
  userID: {
    type: String,
  },
  guesses: [
    {
      word: {
        type: String,
      },
    },
  ],
  attemptsRemaining: {
    type: Number,
  },
  streak: {
    type: Number,
  },
});

GlobalDailyGameSchema.set("timestamps", true);
