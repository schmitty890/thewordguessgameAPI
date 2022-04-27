import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GlobalDailyGameWordSchema = new Schema({
  word: {
    type: String,
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

GlobalDailyGameWordSchema.set("timestamps", true);
