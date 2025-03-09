import express from "express";
import { validatePromocode, validatePromocodeName, validatePromocodeId } from "../../middlewares/validatePromocode.js"
import { addPromocode, deletePromocode, getPromocodes, updatePromocode, getPromocodeByName } from "./promocode.controller.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";

export const promocodeRoutes = express.Router();
promocodeRoutes.use(auth);
promocodeRoutes.use(role.check('admin', 'seller'));

promocodeRoutes.post("/addPromocode", validatePromocode, validatePromocodeName, addPromocode);
promocodeRoutes.get("/getPromocodes", getPromocodes);
promocodeRoutes.get("/getPromocode", getPromocodeByName);
promocodeRoutes.put("/updatePromocode/:id", validatePromocodeId, validatePromocode, validatePromocodeName, updatePromocode);
promocodeRoutes.delete("/deletePromocode/:id", validatePromocodeId, deletePromocode);