import { guessGlobalDailyGameWord } from "../controllers/globalDailyGameController";

const routes = (app) => {
  // create game route
  app.route("/globalDailyGameWord").post(guessGlobalDailyGameWord);
};

export default routes;
