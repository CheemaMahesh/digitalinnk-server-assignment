import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
import { productRouter } from "./routes/product.routes";
import { cartRouter } from "./routes/cart.routes";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/product", productRouter);
app.use("/v1/cart", cartRouter);

app.listen(PORT, () => {
  console.log("Server is up and ryunning on PORT: ", PORT);
});
