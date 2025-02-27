import express from "express";
import config from "config";

import db from "./database/db.js";
import clg from "./middlewares/clg.js";
import notFound from "./middlewares/404.js";
import LoginRoute from "./modules/auth/login/login.routes.js";
import RegisterRoute from "./modules/auth/register/register.routes.js";

const app = express();

app.use(express.json());
app.use(LoginRoute);
app.use(RegisterRoute);

app.use(clg);
app.use(notFound);

db();

const local_port = config.get("sys_info.local_port");
app.listen(local_port, () => {
  console.log("Server is running on port", local_port);
});
