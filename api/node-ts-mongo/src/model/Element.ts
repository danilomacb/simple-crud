import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

ElementSchema.virtual("id").get(function (_id: String) {
  return _id;
});

ElementSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Element", ElementSchema);
