import User from "../models/user.model.js";
import { compare, hash } from "bcrypt";
import { generateToken, jwtCookieOptions } from "../service/auth.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      msg: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve users.",
      error: error.message || error,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      msg: "User created successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to create user.",
      error: error.message || error,
    });
  }
};
export const signIn = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userPassword || !userEmail) throw new Error("all fields required!");

    const user = await User.findOne({ userEmail });
    if (!user) throw new Error("user not exist!");
    const isMatch = await compare(userPassword, user.userPassword);
    if (!isMatch) throw new Error("Password not Valid!");
    const data = generateToken(user);
    const token = data.token;
    const payload = data.payload;

    res.cookie("token", token, jwtCookieOptions);
    res.status(200).json({
      success: true,
      msg: "User Sign-in Successfully ",
      data: payload,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: error.message,
      error: error.message || error,
    });
  }
};
