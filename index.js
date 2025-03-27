import express from "express";
import config from "config";
import passport from "passport";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
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
import { GoogleGenerativeAI } from '@google/generative-ai';
import promptSync from 'prompt-sync';
import fs from 'node:fs';
import mime from 'mime-types';
import mongoose from "mongoose";
import { productModel } from "./database/models/product.model.js";
import { orderModel } from "./database/models/order.model.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
app.use("/uploads", express.static("uploads"));
app.use(categoryRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(promocodeRoutes);
app.use(bannerRoutes);
app.use(wishlistRoutes);
app.use(orderRouter);
app.use(storeRoutes);
app.use(clg);
db();

const local_port = config.get("sys_info.local_port");
app.listen(local_port, () => {
  console.log("Server is running on port", local_port);
});

const apiKey = config.get("GEMINI_API_KEY");
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

async function handleResponse(result, res, req) {
  if (result.error) {
    return res.status(500).send({ error: result.error.message });
  }

  const response = result.response;
  let finalResponse = response.text();

  try {
    const userInput = req.body.userInput.toLowerCase();

    if (userInput.includes("hi") || userInput.includes("hello")) {
      finalResponse = "Hello! Here are the available options:\n1. Track order (type 'track order')";
    } else if (userInput.includes("track order")) {
      const orderIdRegex = /order\s(?:id)?\s*([\w-]+)/;
      const match = userInput.match(orderIdRegex);

      if (match && match[1]) {
        const orderId = match[1];

        const order = await orderModel.findById(orderId);

        if (order) {
          finalResponse = `\nOrder ID: ${order._id}\nStatus: ${order.status}\nItems: ${order.items.map(item => item.productName).join(', ')}\nTotal: $${order.total}`;
        } else {
          finalResponse = `\nOrder with ID ${orderId} not found.`;
        }
      } else {
        finalResponse = "Please enter the order ID.";
      }
    } else {
      finalResponse = "Sorry, I didn't understand that. Please choose from the available options.";
    }

    res.send({ response: finalResponse });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Database error" });
  }

  const candidates = response.candidates;
  if (candidates) {
    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  }
}

app.post('/api/bot', async (req, res) => {
  const userInput = req.body.userInput;
  if (!userInput) {
    return res.status(400).send({ error: 'userInput is required' });
  }
  const chatSession = model.startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(userInput);
  await handleResponse(result, res, req);
});
app.use(notFound);
