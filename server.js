const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRout");
const subCategoryRoute = require("./routes/subCategoryRout");
const brandRoute = require("./routes/brandRout");
const productRoute = require("./routes/productRout");
const userRoute = require("./routes/userRout");
const globalError = require("./middelware/errorMiddleware");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategory", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`Cant Find This Route :${req.originalUrl}`, 400));
});

//Global Errore Handling Middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

//Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
