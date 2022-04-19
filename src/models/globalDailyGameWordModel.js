import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GlobalDailyGameWordSchema = new Schema({
  word: {
    type: String,
  },
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
});

GlobalDailyGameWordSchema.set("timestamps", true);
