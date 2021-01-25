const Element = require("../model/Element");

module.exports = async (req, res) => {
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
