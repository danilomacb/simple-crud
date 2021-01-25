const Element = require("../model/Element");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await Element.findByIdAndUpdate(id, req.body);
  } catch (err) {
    console.error("Error on update element\n", err);
    res.status(500).send("Error on update element");
    return;
  }

  res.status(200).send("Element updated");
};
