const mongoose = require("mongoose");
// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand Must Be Unique"],
      minlength: [3, "Too Short brand Name"],
      maxlength: [32, "Too Long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create model
module.exports = mongoose.model("brand", brandSchema);
