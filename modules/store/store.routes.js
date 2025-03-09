import express from "express";
import {
  createStore,
  displayAllStores,
  displayStore,
  removeStore,
  updateStore,
} from "./store.controller.js";
import { validateOrder } from "../../middlewares/validateStore.js";
import auth from "../../middlewares/auth.js";
const storeRoutes = express.Router();

storeRoutes.get("/stores", displayAllStores); // admin only
storeRoutes.get("/store/:id", displayStore);
storeRoutes.post("/store", auth, validateOrder, createStore);
storeRoutes.put("/store/:id", updateStore);
storeRoutes.delete("/store/:id", removeStore);

export default storeRoutes;
