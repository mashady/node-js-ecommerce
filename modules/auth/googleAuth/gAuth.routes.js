import express from "express";
import {
  googleAuth,
  googleCallback,
  logout,
} from "../googleAuth/gAuth.controller.js";

const router = express.Router();

router.get("/auth/google", googleAuth);

router.get("/auth/google/callback", googleCallback);

router.get("/logout", logout);

export default router;
