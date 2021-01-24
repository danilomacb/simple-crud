import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Element from "./model/Element";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    await Element.create(req.body);
  } catch (err) {
    console.error("Error on create element\n", err);
    res.status(500).send("Error on create element");
    return;
  }

  res.status(200).send("Element created");
});

app.get("/", async (req, res) => {
  let elements;
  try {
    elements = await Element.find();
  } catch (err) {
    console.error("Error on list elements\n", err);
    res.status(500).send("Error on read");
    return;
  }

  res.status(200).json(elements);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Element.findByIdAndUpdate(id, req.body);
  } catch (err) {
    console.error("Error on update element\n", err);
    res.status(500).send("Error on update element");
    return;
  }

  res.status(200).send("Element updated");
});

app.delete("/:id", async (req, res) => {
  try {
    await Element.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.error("Error on delete element\n", err);
    res.status(500).send("Error on delete element");
    return;
  }

  res.status(200).send("Element deleted");
});

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
