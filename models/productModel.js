const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product required"],
      trim: true,
      //   unique:[true,"Category Must Be Unique"],
      minlength: [3, "Too Short Product Name"],
      maxlength: [500, "Too Long Product name"],
    },
    //A and B => shoping.com/a-and-b
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      minlength: [20, "Too Short Product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price required"],
      trim: true,
      max: [200000, "Too Long Product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover required"],
    },
    images: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product Must Be Belong to Category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating Must be Above or equal 1.0"],
      max: [5, "Rating Must be Below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
