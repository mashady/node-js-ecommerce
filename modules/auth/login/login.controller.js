import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  let user;
  // if not verified => verify your email first
  // if accout type is seller and have no account => create account
  if (email) {
    user = await userModel.findOne({ email: email });
  }
  if (phoneNumber) {
    user = await userModel.findOne({ phoneNumber: phoneNumber });
  }

  if (!user) return res.status(400).send("Invalid email or password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.status(200).send({ message: "logged successfully", token });
};
export default login;
