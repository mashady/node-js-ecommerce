import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    const verifyHtmlPath = path.resolve('public', 'verify.html');

    //verify.html
    const { email, firstName, lastName, role } = user;
    res.sendFile(verifyHtmlPath);
  });
};

export { verifyEmail };
