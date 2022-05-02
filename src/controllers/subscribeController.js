import mongoose from "mongoose";
import { SubscribeSchema } from "../models/subscribeModel";

const Subscriber = mongoose.model("Subscriber", SubscribeSchema);

export const registerSubscriber = (req, res) => {
  const newSubscriber = new Subscriber(req.body);
  console.log(newSubscriber);
  Subscriber.findOne({ email: req.body.email }).then(function (result) {
    console.log("if check for result");
    if (result) {
      console.log("email already subscribed");
      return res.status(409).json({ message: "email already subscribed" });
    } else {
      console.log(newSubscriber);
      newSubscriber.save((err, user) => {
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          return res.json({
            _id: user.id,
            message: "thank you for subscribing",
          });
        }
      });
    }
  });
};
