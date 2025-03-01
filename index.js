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
import reviewRoutes from "./modules/reviews/review.routes.js";
const app = express();

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
app.use(reviewRoutes);

app.use(clg);
app.use(notFound);

db();

const local_port = config.get("sys_info.local_port");
app.listen(local_port, () => {
  console.log("Server is running on port", local_port);
});
