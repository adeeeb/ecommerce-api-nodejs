const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const Facteory = require("./handlersFactory");

//@desc    Get List Of Products
//@Route  Get  /api/v1/proudctss
//@access   Public
exports.getProducts = asyncHandler(async (req, res) => {
  //Build Query
  const documentsCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search("Products")
    .limitFields()
    .sort();

  //Excute Query
  const { mongooseQuery, pagenationResult } = apiFeatures;
  const product = await mongooseQuery;
  res
    .status(200)
    .json({ results: product.length, pagenationResult, data: product });
});

//@desc get specific by id
//@Rout  Get /api/v1/proudcts/:id
//@access public
exports.getProduct = asyncHandler(async (req, res, next) => {
  // const id = req.params.id;
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    //res.status(404).json({msg:`No Category for this id ${id}`});
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc  Create product
//@Route   Post  /api/v1/products
//@access private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  //const category = Category.findById(req.body.Category);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

//@desc  update specific product
//@Route  PUT /api/v1/product/:id
//@access  private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    //res.status(404).json({msg:`No Category for this id ${id}`});
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
//@desc  delete specific product
//@Route  DELETE /api/v1/product/:id
//@access  private
exports.deletProduct = Facteory.deleteOne(Product);
