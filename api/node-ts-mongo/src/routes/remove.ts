import { Request, Response } from "express";

import Element from "../model/Element";

export default async (req: Request, res: Response) => {
  try {
    await Element.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.error("Error on delete element\n", err);
    res.status(500).send("Error on delete element");
    return;
  }

  res.status(200).send("Element deleted");
};
