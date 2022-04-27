import {
  guessGlobalDailyGameWord,
  postNewGlobalDailyGameWord,
  getUsersGuesses,
  resetDailyGuesses,
  getDailyWordLength,
} from "../controllers/globalDailyGameController";

const routes = (app) => {
  // create game route
  app.route("/globalDailyGameWord").post(guessGlobalDailyGameWord);

  app.route("/addNewDailyWord").post(postNewGlobalDailyGameWord);

  app.route("/resetDailyGuesses").post(resetDailyGuesses);

  app.route("/getDailyWordLength").post(getDailyWordLength);

  app.route("/getUsersGuesses/:userID").get(getUsersGuesses);
};

export default routes;
