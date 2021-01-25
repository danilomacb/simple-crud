import { Request, Response } from "express";

import Element from "../model/Element";

export default async (req: Request, res: Response) => {
  try {
    await Element.create(req.body);
  } catch (err) {
    console.error("Error on create element\n", err);
    res.status(500).send("Error on create element");
    return;
  }

  res.status(201).send("Element created");
};
