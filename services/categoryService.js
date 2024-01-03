const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModel");
const ApiFeatures = require("../utils/apiFeatures");
const Facteory = require("./handlersFactory");
//@desc    Get List Of Categories
//@Route  Get  /api/v1/categories
//@access   Public
exports.getCategories = asyncHandler(async (req, res) => {
  //Build Query
  const documentsCounts = await Category.countDocuments();

  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  const { mongooseQuery, pagenationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res
    .status(200)
    .json({ results: categories.length, pagenationResult, data: categories });
});

//@desc get specific by id
//@Rout  Get /api/v1/categories/:id
//@access public
exports.getCategory = Facteory.getOne(Category);

//@desc  Create Category
//@Route   Post  /api/v1/categories
//@access private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

//@desc  update specific Category
//@Route  PUT /api/v1/categpry/:id
//@access  private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    //res.status(404).json({msg:`No Category for this id ${id}`});
    return next(new ApiError(`No Categorie for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
//@desc  delete specific Category
//@Route  DELETE /api/v1/categpry/:id
//@access  private

exports.deletCategory = Facteory.deleteOne(Category);
