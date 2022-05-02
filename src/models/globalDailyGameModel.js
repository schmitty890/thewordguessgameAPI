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
      correctSpots: [
        {
          spot: {
            type: String,
          },
          letter: {
            type: String,
          },
        },
      ],
    },
  ],
  attemptsRemaining: {
    type: Number,
  },
  correctGuessToday: {
    type: Boolean,
    default: false,
  },
  streak: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
});

GlobalDailyGameSchema.set("timestamps", true);
