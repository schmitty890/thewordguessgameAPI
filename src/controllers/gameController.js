import mongoose from "mongoose";
import { GameSchema } from "../models/gameModel";

const Game = mongoose.model("Game", GameSchema);

export const createGame = (req, res) => {
  console.log("create a new game controller");
  const newGame = new Game(req.body);
  console.log(newGame);

  newGame.save((err, game) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      return res.json(game);
    }
  });
};
