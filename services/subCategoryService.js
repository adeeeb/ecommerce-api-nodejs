const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");
const ApiFeatures = require("../utils/apiFeatures");
const Facteory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFiliterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filiterObj = filterObject;
  next();
};

//@desc  Create subCategory
//@Route   Post  /api/v1/subcategories
//@access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

//@desc    Get List Of subCategories
//@Route  Get  /api/v1/subcategories
//@access   Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  //Build Query
  const documentsCounts = await SubCategory.countDocuments();

  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  const { mongooseQuery, pagenationResult } = apiFeatures;
  // eslint-disable-next-line no-shadow
  const subCategories = await mongooseQuery;
  // .populate({ path: "category", select: "name -_id" });
  res.status(200).json({
    results: subCategories.length,
    pagenationResult,
    data: subCategories,
  });
});

//@desc get specific by id
//@Rout  Get /api/v1/subcategories/:id
//@access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  // const id = req.params.id;
  const { id } = req.params;
  const Subcategory = await SubCategory.findById(id);
  //   .populate({
  //     path: "category",
  //     select: "name -_id",
  //   });
  if (!Subcategory) {
    //res.status(404).json({msg:`No Category for this id ${id}`});
    return next(new ApiError(`No Categorie for this id ${id}`, 404));
  }
  res.status(200).json({ data: Subcategory });
});

//@desc  update specific SubCategory
//@Route  PUT /api/v1/subcategpry/:id
//@access  private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subcategory) {
    //res.status(404).json({msg:`No subCategory for this id ${id}`});
    return next(new ApiError(`No subCategorie for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});
//@desc  delete specific SubCategory
//@Route  DELETE /api/v1/subcategpry/:id
//@access  private
exports.deletSubCategory = Facteory.deleteOne(SubCategory);
