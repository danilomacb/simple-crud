require("dotenv").config();

import express from "express";
import cors from "cors";

import pool from "./db/pool";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { element } = req.body;

  try {
    await pool.query("INSERT INTO elements (content) VALUES ($1)", [element]);
  } catch (err) {
    console.log("Error on create element\n", err);
    res.status(500).send("Error on create element");
    return;
  }

  res.status(201).send("Element created");
});

app.get("/", async (req, res) => {
  let elements;
  try {
    elements = await pool.query("SELECT * FROM elements ORDER BY ID ASC");
  } catch (err) {
    console.log("Error on list all elements\n", err);
    res.status(500).send("Error on list all elements");
    return;
  }

  res.status(200).json(elements.rows);
});

app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  try {
    await pool.query("UPDATE elements SET content = $1 WHERE id = $2", [content, id]);
  } catch (err) {
    console.log("Error on update element\n", err);
    res.status(500).send("Error on update element");
    return;
  }

  res.status(200).send("Element updated");
});

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await pool.query("DELETE FROM elements WHERE id = $1", [id]);
  } catch (err) {
    console.log("Error on delete element\n", err);
    res.status(500).send("Error on delete element");
    return;
  }

  res.status(200).send("Element deleted");
});

app.listen(3001, () => console.log(`Api running`));
