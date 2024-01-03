const mongoose = require("mongoose");
// 1- Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory Must Be Unique"],
      minlength: [2, "Too Short SubCategory Name"],
      maxlength: [32, "Too Long SubCategory name"],
    },
    //A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory Must Be Belong to Parent category"],
    },
  },
  { timestamps: true }
);

// 2- Create model
module.exports = mongoose.model("SubCategory", subCategorySchema);
