import express from "express";

import add from "./add";
import list from "./list";
import update from "./update";
import remove from "./remove";

const router = express.Router();

router.post("/", add);
router.get("/", list);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
