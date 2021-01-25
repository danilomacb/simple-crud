const express = require("express");

const add = require("./add");
const list = require("./list");
const update = require("./update");
const remove = require("./remove");

const router = express.Router();

router.post("/", add);
router.get("/", list);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
