import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import fetchError from "../../../middlewares/fetchError.js";

const login = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  if (!email && !phoneNumber)
    return res
      .status(400)
      .json({ message: "Email or phone number is required." });

  if (!password)
    return res.status(400).json({ message: "Password is required." });

  let user;

  if (email) {
    user = await userModel.findOne({ email: email });
  }
  if (phoneNumber) {
    user = await userModel.findOne({ phoneNumber: phoneNumber });
  }
  console.log(user);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password." });

  if (!user.password || typeof user.password !== "string")
    return res.status(400).json({ message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password." });

  if (!user.isVerified)
    return res.status(403).json({
      message: "Account not verified. Please verify your account first.",
    });
  if (user.AdministrativeStatus === "pending")
    return res.status(403).json({
      message: "Your account is being reviewed. Please wait.",
    });
  if (user.AdministrativeStatus === "restrict")
    return res.status(403).json({
      message: "Your account is restricted. Please contact support.",
    });

  const token = user.generateAuthToken();
  if (!token) {
    return res.status(500).json({ message: "Failed to generate auth token." });
  }

  res.status(200).json({ message: "Logged in successfully.", token });
};

export default login;
