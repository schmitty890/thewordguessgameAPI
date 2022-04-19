import mongoose from "mongoose";
import { GlobalDailyGameSchema } from "../models/globalDailyGameModel";
import { GlobalDailyGameWordSchema } from "../models/globalDailyGameWordModel";

const GlobalDailyGame = mongoose.model(
  "GlobalDailyGame",
  GlobalDailyGameSchema
);
const NewWord = mongoose.model("NewWord", GlobalDailyGameWordSchema);

export const guessGlobalDailyGameWord = (req, res) => {
  console.log("get global daily game word");
  console.log(req.body);
  const newGlobalDailyGame = new GlobalDailyGame(req.body);
  // console.log(newGlobalDailyGame);
  console.log("get the global daily word that every user can guess");
  console.log("compare the users guess with the word");
  console.log("return known letters ");
  console.log("return if its a match");
  console.log("return letters if theyre in the correct spot");
  GlobalDailyGame.findOne({ userID: req.body.userID }).then(function (result) {
    console.log(result);
    if (result) {
      console.log("updating");
      console.log(req.body.userID);
      console.log(result.guesses.length);
      if (result.guesses.length === 5) {
        console.log("user has reached 5 guesses");
        // could have this as attempts remaining. once attemps remaining = 0, stop guessing
        res.json({ message: "you reached 5 guesses" });

        return;
      }
      GlobalDailyGame.findOneAndUpdate(
        { userID: req.body.userID },
        {
          $push: {
            guesses: {
              word: req.body.guesses[0].word,
            },
          },
        },
        { new: false, useFindAndModify: true },
        (err, user) => {
          if (err) {
            res.send(err);
          }
          res.json(user);
        }
      );
    } else {
      newGlobalDailyGame.save((err, word) => {
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          return res.json(word);
        }
      });
    }
  });
};

export const getGlobalDailyGameWord = (req, res) => {
  console.log("getGlobalDailyGameWord");
};

export const postNewGlobalDailyGameWord = (req, res) => {
  console.log("post a new word for the global users");
  console.log("with month day and year values");
  console.log(
    "when a user hits our page, the local timezone will get thier M/D/Y and find the word for them to guess"
  );
  console.log(req.body);
  const newWordEntry = new NewWord(req.body);
  console.log(newWordEntry);

  newWordEntry.save((err, word) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      return res.json(word);
    }
  });
};

export const getUsersGuesses = (req, res) => {
  console.log("get users guesses based on their userID");
  console.log(req.params.userID);

  GlobalDailyGame.findOne({ userID: req.params.userID }).then((result) => {
    console.log("we are in finding user guesses by id");
    console.log(result);
    res.json(result);
  });
};
