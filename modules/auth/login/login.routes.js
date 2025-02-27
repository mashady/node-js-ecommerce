import express from "express";
import login from "./login.controller.js";

const LoginRoute = express.Router();

LoginRoute.post("/login", login);

export default LoginRoute;
