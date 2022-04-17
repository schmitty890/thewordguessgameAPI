import mongoose from "mongoose";
import { GlobalDailyGameSchema } from "../models/globalDailyGameModel";

const GlobalDailyGame = mongoose.model(
  "GlobalDailyGame",
  GlobalDailyGameSchema
);

export const guessGlobalDailyGameWord = (req, res) => {
  console.log("get global daily game word");
  const newGlobalDailyGame = new GlobalDailyGame(req.body);
  console.log(newGlobalDailyGame);
  console.log("get the global daily word that every user can guess");
  console.log("compare the users guess with the word");
  console.log("return known letters ");
  console.log("return if its a match");
  console.log("return letters if theyre in the correct spot");
};

export const getGlobalDailyGameWord = (req, res) => {
  console.log("getGlobalDailyGameWord");
};
