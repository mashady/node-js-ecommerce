import express from "express";
import config from "config";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./database/db.js";
import clg from "./middlewares/clg.js";
import notFound from "./middlewares/404.js";
import LoginRoute from "./modules/auth/login/login.routes.js";
import RegisterRoute from "./modules/auth/register/register.routes.js";
import { cartRoute } from "./modules/cart/cart.route.js";
import gAuthRoutes from "./modules/auth/googleAuth/gAuth.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import { categoryRoutes } from "./modules/category/category.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import orderRouter from "./modules/order/order.route.js";
import { promocodeRoutes } from "./modules/promocode/promocode.routes.js";
import { bannerRoutes } from "./modules/banner/banner.routes.js";
import cors from "cors";
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import storeRoutes from "./modules/store/store.routes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: config.get("SESSION_SECRET"),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(gAuthRoutes);

app.use(LoginRoute);
app.use(RegisterRoute);
app.use(cartRoute);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(promocodeRoutes);
app.use(bannerRoutes);
app.use(wishlistRoutes);
app.use(orderRouter);
app.use(storeRoutes);
app.use(clg);
app.use(notFound);

db();

const local_port = config.get("sys_info.local_port");
app.listen(local_port, () => {
  console.log("Server is running on port", local_port);
});
