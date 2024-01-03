const express = require("express");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deletSubCategory,
  setCategoryIdToBody,
  createFiliterObject,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");

//mergeParams : Allow us to access Parameters on the other routers
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFiliterObject, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deletSubCategory);

module.exports = router;
