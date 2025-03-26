import express from "express";
import {
  validatePromocode,
  validatePromocodeName,
  validatePromocodeId,
} from "../../middlewares/validatePromocode.js";
import {
  addPromocode,
  deletePromocode,
  getPromocodes,
  updatePromocode,
  getPromocodeByName,
} from "./promocode.controller.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const promocodeRoutes = express.Router();
//promocodeRoutes.use(auth);
//promocodeRoutes.use(role.check("admin", "seller"));

promocodeRoutes.post(
  "/addPromocode",
  auth,
  role.check("admin", "seller"),
  validatePromocode,
  validatePromocodeName,
  addPromocode
);
promocodeRoutes.get(
  "/getPromocodes",
  auth,
  role.check("admin", "seller"),
  getPromocodes
);
promocodeRoutes.get(
  "/getPromocode",
  auth,
  role.check("admin", "seller"),
  getPromocodeByName
);
promocodeRoutes.put(
  "/updatePromocode/:id",
  auth,
  role.check("admin", "seller"),
  validatePromocodeId,
  validatePromocode,
  updatePromocode
);
promocodeRoutes.delete(
  "/deletePromocode/:id",
  auth,
  role.check("admin", "seller"),
  validatePromocodeId,
  deletePromocode
);
