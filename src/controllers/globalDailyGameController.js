import mongoose from "mongoose";
import { GlobalDailyGameSchema } from "../models/globalDailyGameModel";
import { GlobalDailyGameWordSchema } from "../models/globalDailyGameWordModel";
// const testDay = 7;
const GlobalDailyGame = mongoose.model(
  "GlobalDailyGame",
  GlobalDailyGameSchema
);
const NewWord = mongoose.model("NewWord", GlobalDailyGameWordSchema);

export const resetDailyGuesses = async (req, res) => {
  console.log(req.body);
  console.log(
    "determine if we should reset the daily guesses since its a new day"
  );

  // req.body.day = testDay;
  GlobalDailyGame.findOne({ userID: req.body.userID }).then(async function (
    result
  ) {
    console.log(result);
    console.log("is this null?");

    if (result) {
      if (
        result.month !== req.body.month ||
        result.day !== req.body.day ||
        result.year !== req.body.year
      ) {
        console.log(result.correctGuessToday);
        let correctGuessLastPlayed;
        let attemptsRemaining;
        if (!result.correctGuessToday) {
          correctGuessLastPlayed = 0;
        }
        attemptsRemaining = 5;
        GlobalDailyGame.findOneAndUpdate(
          { userID: req.body.userID },
          {
            $set: {
              month: req.body.month,
              day: req.body.day,
              year: req.body.year,
              guesses: [],
              correctGuessToday: false,
              streak: correctGuessLastPlayed,
              attemptsRemaining: attemptsRemaining,
            },
          },
          { new: false, useFindAndModify: true },
          (err, user) => {
            if (err) {
              res.send(err);
            }

            res.json({ message: "refresh your browser" });
          }
        );
      }
    }
  });
};

export const getDailyWordLength = async (req, res) => {
  console.log("get daily word length");
  console.log("getGlobalDailyGameWord");
  let word = "";
  await NewWord.findOne({
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
  }).then(function (result) {
    console.log(result.word);
    console.log("word here");
    let arrayLength = result.word.length;
    let array = [];
    for (let i = 0; i < arrayLength; i++) {
      array.push(arrayLength[i]);
    }
    word = array;
  });
  res.json(word);
};

export const guessGlobalDailyGameWord = async (req, res) => {
  console.log("get global daily game word");
  console.log(req.body);

  GlobalDailyGame.findOne({ userID: req.body.userID }).then(async function (
    result
  ) {
    console.log(result);
    console.log("is this null?");

    if (result) {
      // if user has guessed the correct word AND the month day and year are TODAY
      // req.body.day = testDay;
      if (
        result.correctGuessToday === true &&
        result.month === req.body.month &&
        result.day === req.body.day &&
        result.year === req.body.year
      ) {
        console.log("USER HAS ALREADY GOTTEN THE WORD CORRECT TODAY!!!");
        res.json({
          message:
            "you already guessed the correct word today. come back tomorrow!",
        });
        return;
      } else if (
        result.correctGuessToday === true &&
        (result.month !== req.body.month ||
          result.day !== req.body.day ||
          result.year !== req.body.year)
      ) {
        // the user is guessing the next day for the first time and the correctGuessToday is true from yesterday
        console.log("reset users guesses AND correctGuessToday value on model");
        console.log("THEN save the guess and validate if it is correct");
        // console.log(req.body.userID);
        // console.log(req.body);
        const theWordOfTheDay = await getGlobalDailyGameWord(req);
        const checkWordGuess = await checkGlobalDailyWordGuess(
          theWordOfTheDay,
          req.body.guesses[0].word
        );
        if (checkWordGuess.correctGuess) {
          await incrementStreakCount(req.body.userID);
          req.body.correctGuessToday = true;
          console.log("A CORRECT GUESS WAS MADE 1");
          // req.body.message = "correct guess";
        } else {
          req.body.correctGuessToday = false;
        }
        console.log("A GUESS WAS MADE 1");
        req.body.guesses[0].correctSpots = checkWordGuess.correctSpotsArray;
        GlobalDailyGame.findOneAndUpdate(
          { userID: req.body.userID },
          {
            $set: {
              month: req.body.month,
              day: req.body.day,
              year: req.body.year,
              correctGuessToday: req.body.correctGuessToday,
              attemptsRemaining: 5,
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
            if (checkWordGuess.correctGuess) {
              res.json({ message: "correct guess" });
            } else {
              // res.json(word);
              console.log("guess 1");
              res.json({ message: "keep guessing" });
            }
            // res.json(word);
          }
        );
      } else if (
        result.correctGuessToday === false &&
        (result.month !== req.body.month ||
          result.day !== req.body.day ||
          result.year !== req.body.year)
      ) {
        // if it is the next day AND the user did not guess the correct word yesterday, reset the streak and guesses
        console.log("reset users streak AND guesses");
        console.log("THEN save the guess and validate if it is correct");
        const theWordOfTheDay = await getGlobalDailyGameWord(req);
        const checkWordGuess = await checkGlobalDailyWordGuess(
          theWordOfTheDay,
          req.body.guesses[0].word
        );
        resetStreakCount(req.body.userID);
        if (checkWordGuess.correctGuess) {
          await incrementStreakCount(req.body.userID);
          req.body.correctGuessToday = true;
          console.log("A CORRECT GUESS WAS MADE 2");
          // req.body.message = "correct guess";
        } else {
          req.body.correctGuessToday = false;
        }
        req.body.guesses[0].correctSpots = checkWordGuess.correctSpotsArray;
        console.log("A GUESS WAS MADE 2");
        GlobalDailyGame.findOneAndUpdate(
          { userID: req.body.userID },
          {
            $set: {
              month: req.body.month,
              day: req.body.day,
              year: req.body.year,
              correctGuessToday: req.body.correctGuessToday,
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
            if (checkWordGuess.correctGuess) {
              res.json({ message: "correct guess" });
            } else {
              // res.json(user);
              console.log("guess 2");
              res.json({ message: "keep guessing" });
            }
            // res.json(user);
          }
        );
      } else if (result.guesses.length === 5) {
        console.log("user has reached 5 guesses");
        // could have this as attempts remaining. once attemps remaining = 0, stop guessing
        res.json({ message: "you reached 5 guesses" });

        return;
      } else {
        // no cases were hit, go ahead and save the word
        const theWordOfTheDay = await getGlobalDailyGameWord(req);

        console.log("ZZZZZZZZZZZZZZZZZZZZ");
        console.log(`THE WORD OF THE DAY`);
        console.log(theWordOfTheDay);
        console.log(`THE WORD OF THE DAY`);
        const checkWordGuess = await checkGlobalDailyWordGuess(
          theWordOfTheDay,
          req.body.guesses[0].word
        );
        console.log(checkWordGuess);

        console.log("ZZZZZZZZZZZZZZZZZZZZ");
        // let dataObj = {
        //   $push: {
        //     guesses: {
        //       word: req.body.guesses[0].word,
        //     },
        //   },
        // },
        if (checkWordGuess.correctGuess) {
          await incrementStreakCount(req.body.userID);
          console.log("A CORRECT GUESS WAS MADE 4");
        }
        req.body.guesses[0].correctSpots = checkWordGuess.correctSpotsArray;

        console.log("A GUESS WAS MADE 4");
        console.log("here here");
        console.log(checkWordGuess.correctSpotsArray);
        console.log("here here");
        GlobalDailyGame.findOneAndUpdate(
          { userID: req.body.userID },
          {
            $push: {
              guesses: {
                word: req.body.guesses[0].word,
                correctSpots: req.body.guesses[0].correctSpots,
              },
            },
            $inc: { attemptsRemaining: -1 },
          },

          { new: false, useFindAndModify: true },
          (err, user) => {
            if (err) {
              res.send(err);
            }
            if (checkWordGuess.correctGuess) {
              res.json({ message: "correct guess" });
            } else {
              // res.json(user);
              console.log("guess 3");
              // console.log(user);
              let message = "";
              // console.log("DO WE GET IN?????????????????????????????????");
              console.log(user.attemptsRemaining);
              if (user.attemptsRemaining === 1) {
                // console.log("CHECK HERE");
                // console.log(checkWordGuess);
                // console.log("CHECK HERE");
                message = `The answer is: ${checkWordGuess.answer.toUpperCase()}`;
              } else {
                message = "keep guessing";
              }
              res.json({ message });
            }
          }
        );
      }
    } else {
      const theWordOfTheDay = await getGlobalDailyGameWord(req);

      console.log(`THE WORD OF THE DAY`);
      console.log(theWordOfTheDay);
      console.log(req.body);

      console.log(`THE WORD OF THE DAY`);
      const checkWordGuess = await checkGlobalDailyWordGuess(
        theWordOfTheDay,
        req.body.guesses[0].word,
        req.body.userID
      );
      if (checkWordGuess.correctGuess) {
        req.body.streak = 1;
        req.body.correctGuessToday = true;
        console.log("A CORRECT GUESS WAS MADE 3");
        // req.body.message = "correct guess";
      }
      console.log("HERRRREEEEEEE");
      console.log(checkWordGuess);
      // console.log(req.body.guesses.correctSpots);
      req.body.guesses[0].correctSpots = checkWordGuess.correctSpotsArray;
      req.body.attemptsRemaining = 4;
      console.log("HERRRREEEEEEE");
      console.log("A GUESS WAS MADE 3");
      const newGlobalDailyGame = new GlobalDailyGame(req.body);
      newGlobalDailyGame.save((err, word) => {
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          if (checkWordGuess.correctGuess) {
            res.json({ message: "correct guess" });
          } else {
            // res.json(word);
            console.log("guess 4");
            res.json({ message: "keep guessing" });
          }
          // return res.json(word);
        }
      });
    }
  });
};

export const incrementStreakCount = async (userID) => {
  console.log("increment Streak Count");
  console.log(userID);
  console.log("increment Streak Count");
  await GlobalDailyGame.findOneAndUpdate(
    { userID: userID },
    { $inc: { streak: 1 }, $set: { correctGuessToday: true } },
    { new: false, useFindAndModify: true }
  );
};

export const resetStreakCount = async (userID) => {
  await GlobalDailyGame.findOneAndUpdate(
    { userID: userID },
    { $set: { streak: 0, attemptsRemaining: 5 } },
    { new: false, useFindAndModify: true }
  );
};

export const getGlobalDailyGameWord = async (req, res) => {
  console.log("getGlobalDailyGameWord");
  let word = "";
  await NewWord.findOne({
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
  }).then(function (result) {
    console.log(result.word);
    console.log("word here");
    word = result.word;
  });
  return word;
};

const checkGlobalDailyWordGuess = async (answer, guess, userID) => {
  console.log("check global daily word guess");
  console.log(answer);
  console.log(guess);
  console.log(userID);
  console.log(
    "check letter by letter the two words here and return them with the true or false"
  );
  // let correctSpotsArray = [];
  let dataObj = {
    correctSpotsArray: [],
    letter: [],
  };
  for (var i = 0; i < answer.length; i++) {
    console.log(answer[i] + " compare to: " + guess[i]);
    if (answer[i] === guess[i]) {
      console.log("push to array correct spot");
      dataObj.correctSpotsArray.push({ spot: "correct", letter: guess[i] });
    } else if (answer.includes(guess[i])) {
      dataObj.correctSpotsArray.push({ spot: "in the word", letter: guess[i] });
    } else {
      dataObj.correctSpotsArray.push({ spot: "not there", letter: guess[i] });
    }
  }
  console.log(dataObj.correctSpotsArray);
  if (answer === guess) {
    dataObj.correctGuess = true;
    dataObj.answer = answer;
    return dataObj;
  } else {
    dataObj.correctGuess = false;
    dataObj.answer = answer;
    return dataObj;
  }
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
