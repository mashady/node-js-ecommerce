import express from "express";
import register from "./register.controller.js";
import { verifyEmail } from "./verifyEmail.controller.js";
import { validateUser } from "../../../middlewares/validateUser.js";
const RegisterRoute = express.Router();

RegisterRoute.post("/register", validateUser, register);
RegisterRoute.get("/verify/:token", verifyEmail);

export default RegisterRoute;
