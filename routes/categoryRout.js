const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
// const { param, validationResult } = require('express-validator');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deletCategory,
} = require("../services/categoryService");

const subcategoriesRoute = require("./subCategoryRout");

const router = express.Router();

// router.get('/',getCategories);
// router.post('/',createCategory);

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deletCategory);

module.exports = router;
