const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({msg:`No Category for this id ${id}`});
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).send();
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    // const id = req.params.id;
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      //res.status(404).json({msg:`No Category for this id ${id}`});
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    //Build Query
    const documentsCounts = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(documentsCounts)
      .filter()
      .search()
      .limitFields()
      .sort();

    const { mongooseQuery, pagenationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, pagenationResult, data: documents });
  });
