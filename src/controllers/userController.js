import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) => {
  console.log(req);
  if (req.user) {
    console.log("we in here login required");
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

export const register = (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  console.log(newUser);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      user.hashPassword = undefined;
      // return res.json(user);
      return res.json({
        token: jwt.sign(
          { email: user.email, firstName: user.firstName, _id: user.id },
          "RESTFULAPIs"
        ),
        _id: user.id,
      });
    }
  });
};

export const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res
          .status(401)
          .json({ message: "authentication failed, no user found" });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res
            .status(401)
            .json({ message: "authentication failed, wrong password" });
        } else {
          return res.json({
            token: jwt.sign(
              { email: user.email, firstName: user.firstName, _id: user.id },
              "RESTFULAPIs"
            ),
            _id: user.id,
          });
        }
      }
    }
  );
};

export const getUserWithID = (req, res) => {
  console.log(req.params.userID);
  User.findById(req.params.userID, (err, user) => {
    console.log("we are in finding by id");
    console.log(user);
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const updateUserWithID = (req, res) => {
  const myobj = JSON.parse(Object.keys(req.body)[0]);
  User.findOneAndUpdate(
    { _id: req.params.userID },
    myobj,
    { new: false, useFindAndModify: true },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};
