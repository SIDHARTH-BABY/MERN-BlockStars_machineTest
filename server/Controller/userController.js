import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const userRegister = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      password: passwordHash,
      coinCount: 0,
    });
    if (!newUser) {
      res.status(500).json({
        success: false,
        message: "Username Exist",
      });
    }
    const savedUser = await newUser.save();
    res.status(201).json({
      data: savedUser,
      success: true,
      message: "succesfully registered",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  console.log(req.body, "bodyy");
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName: userName });

    if (!user) return res.status(400).json({ msg: " User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "Invalid Credentials", success: false });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ message: "login success", success: true, user, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "error Logging", success: false });
  }
};

export const userData = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          userName: user.userName,
          id: user._id,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting user info", success: false, error });
  }
};
