const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validator/brandValidator");
// const { param, validationResult } = require('express-validator');

const {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deletBrand,
} = require("../services/brandService");

const router = express.Router();

// router.get('/',getCategories);
// router.post('/',createBrand);

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deletBrand);

module.exports = router;
