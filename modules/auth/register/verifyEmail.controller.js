import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";

const verifyEmail = (req, res) => {
  const verifyToken = req.params.token;
  jwt.verify(verifyToken, "emailToken", async (err, token) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await userModel.findOneAndUpdate(
      { email: token },
      { isVerified: true },
      { new: true }
    );
    const { email, firstName, lastName, role } = user;
    res.json({
      message: "Email verified successfully",
      user: {
        email,
        firstName,
        lastName,
        role,
      },
    });
  });
};

export { verifyEmail };
