import { registerSubscriber } from "../controllers/subscribeController";

const routes = (app) => {
  app.route("/subscribe").post(registerSubscriber);
};

export default routes;
