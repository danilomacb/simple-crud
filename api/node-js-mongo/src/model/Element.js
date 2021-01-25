const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

ElementSchema.virtual("id").get(function (_id) {
  return _id;
});

ElementSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Element", ElementSchema);
