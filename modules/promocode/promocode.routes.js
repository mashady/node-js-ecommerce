import express from "express";
import { validatePromocode, validatePromocodeName, validatePromocodeId } from "../../middlewares/validatePromocode.js"
import { addPromocode, deletePromocode, getPromocodes, updatePromocode } from "./promocode.controller.js";

export const promocodeRoutes = express.Router();

promocodeRoutes.post("/addPromocode", validatePromocode, validatePromocodeName, addPromocode);
promocodeRoutes.get("/getPromocodes", getPromocodes);
promocodeRoutes.put("/updatePromocode/:id", validatePromocodeId, validatePromocode, validatePromocodeName, updatePromocode);
promocodeRoutes.delete("/deletePromocode/:id", validatePromocodeId, deletePromocode);