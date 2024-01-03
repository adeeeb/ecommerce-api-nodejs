const { check } = require("express-validator");
const validatorMiddleware = require("../../middelware/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory Must be Belong Category")
    .isMongoId()
    .withMessage("Invalid SubCategory id"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id"),
  validatorMiddleware,
];
