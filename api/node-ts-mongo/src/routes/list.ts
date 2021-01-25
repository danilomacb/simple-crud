import { Request, Response } from "express";

import Element from "../model/Element";

export default async (req: Request, res: Response) => {
  let elements;
  try {
    elements = await Element.find();
  } catch (err) {
    console.error("Error on list elements\n", err);
    res.status(500).send("Error on read");
    return;
  }

  res.status(200).json(elements);
};
