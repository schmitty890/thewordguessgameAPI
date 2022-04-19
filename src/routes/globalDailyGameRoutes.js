import {
  guessGlobalDailyGameWord,
  postNewGlobalDailyGameWord,
  getUsersGuesses,
} from "../controllers/globalDailyGameController";

const routes = (app) => {
  // create game route
  app.route("/globalDailyGameWord").post(guessGlobalDailyGameWord);

  app.route("/addNewDailyWord").post(postNewGlobalDailyGameWord);

  app.route("/getUsersGuesses/:userID").get(getUsersGuesses);
};

export default routes;
