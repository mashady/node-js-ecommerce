import express from "express";
import {
  createStore,
  displayAllStores,
  displayStore,
  removeStore,
  updateStore,
  getOrdersForSellerProducts,
  displayMyStoreStore,
} from "./store.controller.js";
import { validateStore } from "../../middlewares/validateStore.js";
import auth from "../../middlewares/auth.js";
import role from "../../middlewares/role.js";
const storeRoutes = express.Router();

storeRoutes.get("/stores", auth, role.check("admin"), displayAllStores); // admin only
storeRoutes.get("/store", auth, displayMyStoreStore);
storeRoutes.get("/store/:id", displayStore);
storeRoutes.get("/storeorders", auth, getOrdersForSellerProducts);
storeRoutes.post(
  "/store",
  auth,
  role.check("seller"),
  validateStore,
  createStore
);
storeRoutes.put(
  "/store/:id",
  auth,
  role.check("seller"),
  validateStore,
  updateStore
);
storeRoutes.delete("/store/:id", auth, role.check("seller"), removeStore);

export default storeRoutes;
