import express from "express";
import register from "./register.controller.js";

const RegisterRoute = express.Router();

RegisterRoute.post("/register", register);

export default RegisterRoute;
