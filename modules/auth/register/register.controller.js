import { userModel } from "../../../database/models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateUser } from "../../../middlewares/validateUser.js";
import { sendEmail } from "../../../services/email.js";
const register = async (req, res) => {
  // user must to send role [ user / seller ] => user for user accounts and sellers for seller one
  const { email, firstName, lastName, phoneNumber, password, subscribed } =
    req.body;

  const existingUser = await userModel.findOne({ email });
  const existingPhoneNumber = await userModel.findOne({ phoneNumber });

  if (existingUser) {
    return res.status(400).json({ errors: ["Email already exists"] });
  }
  if (existingPhoneNumber) {
    return res.status(400).json({ errors: ["Phone number already exists"] });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  sendEmail(email);
  const newUser = new userModel({
    email,
    firstName,
    lastName,
    phoneNumber,
    password: hashedPassword,
    subscribed,
  });
  await newUser.save();
  const token = newUser.generateAuthToken();
  res.status(201).json({
    user: {
      email,
      firstName,
      lastName,
      role: newUser.role,
      isVerified: newUser.isVerified,
    },
    token,
  });
};
export default register;
