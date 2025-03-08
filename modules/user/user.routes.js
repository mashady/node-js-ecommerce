import express from "express";
import auth from "../../middlewares/auth.js";
import { validateProfileUpdate } from "../../middlewares/validateProfileUpdate.js";
const userRoutes = express.Router();
import {
  getUsers,
  searchUsers,
  userPfoile,
  updateUser,
} from "./user.controller.js";

userRoutes.get("/user", getUsers); //fetch all users
userRoutes.get("/user/search", searchUsers); // search users
userRoutes.get("/user/profile", auth, userPfoile); // logged user profile
userRoutes.put("/user", auth, validateProfileUpdate, updateUser); // profile update

export default userRoutes;

/**
todo 
if user wanna to update email we just check if already exist or no and if every this is okay send verf mail




*/
