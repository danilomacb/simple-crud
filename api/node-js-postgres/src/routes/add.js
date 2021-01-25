const pool = require("../db/pool");

module.exports = async (req, res) => {
  const { content } = req.body;

  try {
    await pool.query("INSERT INTO elements (content) VALUES ($1)", [content]);
  } catch (err) {
    console.log("Error on create element\n", err);
    res.status(500).send("Error on create element");
    return;
  }

  res.status(201).send("Element created");
};
