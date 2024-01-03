const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Brand = require("../models/brandModel");
const ApiFeatures = require("../utils/apiFeatures");
const Facteory = require("./handlersFactory");
//@desc    Get List Of brands
//@Route  Get  /api/v1/brands
//@access   Public
exports.getBrands = Facteory.getAll(Brand);
//@desc get specific by id
//@Rout  Get /api/v1/brands/:id
//@access public
exports.getBrand = Facteory.getOne(Brand);

//@desc  Create brand
//@Route   Post  /api/v1/brand
//@access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

//@desc  update specific brand
//@Route  PUT /api/v1/brand/:id
//@access  private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    //res.status(404).json({msg:`No brand for this id ${id}`});
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
//@desc  delete specific brand
//@Route  DELETE /api/v1/brands/:id
//@access  private
exports.deletBrand = Facteory.deleteOne(Brand);
