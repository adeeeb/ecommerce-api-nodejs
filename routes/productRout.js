const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productValidator");
// const { param, validationResult } = require('express-validator');

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deletProduct,
} = require("../services/productService");

const subcategoriesRoute = require("./subCategoryRout");

const router = express.Router();

// router.get('/',getCategories);
// router.post('/',createCategory);

router.use("/:categoryId/subcategories", subcategoriesRoute);

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deletProduct);

module.exports = router;
