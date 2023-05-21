const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Modals/user.model");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const htmlContent = require("../email");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyank764fz7@gmail.com",
    pass: process.env.key,
  },
});

//for registering a new user
userRouter.post("/verifyemail", async (req, res) => {
  console.log(1);
  const { email, password, username } = req.body;
  try {
    const userinDb = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    console.log(userinDb);
    if (userinDb) {
      return res.status(400).json({ msg: "Username or email already used" });
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    let msgDel = {
      from: "priyank764fz7@gmail.com",
      to: email,
      subject: "OTP For Todo From Priyank Gupta",
      html: htmlContent(otp),
    };
    mailTransporter.sendMail(msgDel, (err) => {
      if (err) {
        console.log(err);
        return res.send({ msg: "Invalid email" });
      } else {
        console.log("email  sent ");
        res.status(201).send({
          msg: "email verification done!!!",
          data: { email, password, username, otp },
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "some internal error" });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userinDb = await UserModel.findOne({ email });
    if (userinDb) {
      return res.status(400).json({ msg: "User already registered" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "some internal errror" });
      }
      const user = new UserModel({
        email,
        password: hash,
        username,
      });
      await user.save();
      res.status(201).send({ msg: "registered successfully!!!" });
    });
  } catch (err) {
    res.status(401).send({ msg: "some internal error" });
  }
});

//for login  user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({
      email,
    });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        msg: `User not found`,
      });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ userId: user._id }, "secret");
        res.status(201).send({
          msg: "Logged in Successfully",
          token,
          data: {
            username: user.username,
            email: user.email,
            userId: user._id,
          },
        });
      } else {
        res.status(401).send({
          msg: `Wrong Password `,
        });
      }
    });
  } catch (e) {
    res.status(500).send({ msg: "some internal error" });
  }
});

userRouter.post("/resetpass", async (req, res) => {
  const { email } = req.body;
  try {
    const user = UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        msg: `User not found`,
      });
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  } catch (err) {
    res.status(500).send({ msg: "some internal error" });
  }
});

module.exports = { userRouter };
