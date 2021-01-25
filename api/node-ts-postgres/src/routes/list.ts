import { Request, Response } from "express";

import pool from "../db/pool";

export default async (req: Request, res: Response) => {
  let elements;
  try {
    elements = await pool.query("SELECT * FROM elements ORDER BY ID ASC");
  } catch (err) {
    console.log("Error on list all elements\n", err);
    res.status(500).send("Error on list all elements");
    return;
  }

  res.status(200).json(elements.rows);
};
