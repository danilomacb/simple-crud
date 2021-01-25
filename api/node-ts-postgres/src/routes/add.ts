import { Request, Response } from "express";

import pool from "../db/pool";

export default async (req: Request, res: Response) => {
  try {
    await pool.query("INSERT INTO elements (content) VALUES ($1)", [req.body.content]);
  } catch (err) {
    console.log("Error on create element\n", err);
    res.status(500).send("Error on create element");
    return;
  }

  res.status(201).send("Element created");
};
