import { createGame } from "../controllers/gameController";

const routes = (app) => {
  // create game route
  app.route("/createGame").post(createGame);
};

export default routes;
