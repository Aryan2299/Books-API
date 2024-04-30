import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { authRouter } from "./routes/auth";
import { booksRouter } from "./routes/books";
import { swaggerDocs } from "../swagger";

dotenv.config();

const { PORT, DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL as string);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  swaggerDocs(app);
});
