const express = require("express");
const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRouter = express.Router();

//Signup Route
UserRouter.post("/signup", async (req, res) => {
  const { confirm_password, email } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    res.send("Already have Account");
  } else {
    try {
      bcrypt.hash(confirm_password, 5, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          const NewUser = new UserModel({
            ...req.body,
            password: hash,
            confirm_password: hash,
          });
          await NewUser.save();
          res.send("Account Created Successfully");
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
});

//Login Route

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.confirm_password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "masai");
          res.send({ msg: "Login Successfull", token });
        } else {
          res.send("Invalid Credentials");
        }
      });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  UserRouter,
};
