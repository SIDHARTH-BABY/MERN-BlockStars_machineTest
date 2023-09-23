import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import coinRoute from "./routes/coinRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`SUCCESSFULLY CONNECTED TO ${PORT}`);
  });
});

app.use("/coin", coinRoute);
app.use("/user", userRoute);
