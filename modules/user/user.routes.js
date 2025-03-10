import express from "express";
import auth from "../../middlewares/auth.js";
import { validateProfileUpdate } from "../../middlewares/validateProfileUpdate.js";
import role from "../../middlewares/role.js";
const userRoutes = express.Router();
import {
  getUsers,
  searchUsers,
  userPfoile,
  updateUser,
  updateAdministrativeStatus,
} from "./user.controller.js";

userRoutes.get("/user", auth, role.check("admin"), getUsers); //fetch all users
userRoutes.get("/user/search", auth, role.check("admin"), searchUsers); // search users
userRoutes.get("/user/profile", auth, userPfoile); // logged user profile
userRoutes.put("/user/profile", auth, validateProfileUpdate, updateUser); // profile update
userRoutes.put("/user", auth, role.check("admin"), updateAdministrativeStatus); // profile update

export default userRoutes;

/**
todo 
if user wanna to update email we just check if already exist or no and if every this is okay send verf mail




*/
