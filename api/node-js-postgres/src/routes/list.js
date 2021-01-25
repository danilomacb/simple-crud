const pool = require("../db/pool");

module.exports = async (req, res) => {
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
