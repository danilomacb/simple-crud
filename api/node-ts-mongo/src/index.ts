import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

mongoose.connect(
  "mongodb://localhost:27017/node-ts-mongo",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.error("Error on connect to mongodb\n", err);
      return;
    }
  }
);

app.listen(3001, () => console.log("Api running"));
