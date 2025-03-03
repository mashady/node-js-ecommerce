import jwt from "jsonwebtoken";
import config from "config";

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized, login first");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token");
  }
};

export default auth;
