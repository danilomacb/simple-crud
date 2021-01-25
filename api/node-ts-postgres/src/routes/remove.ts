import { Request, Response } from "express";

import pool from "../db/pool";

export default async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await pool.query("DELETE FROM elements WHERE id = $1", [id]);
  } catch (err) {
    console.log("Error on delete element\n", err);
    res.status(500).send("Error on delete element");
    return;
  }

  res.status(200).send("Element deleted");
};
