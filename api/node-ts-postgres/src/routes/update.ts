import { Request, Response } from "express";

import pool from "../db/pool";

export default async (req: Request, res: Response) => {
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
};
