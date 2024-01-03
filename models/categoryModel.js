const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Category required"],
    unique:[true,"Category Must Be Unique"],
    minlength:[3,"Too Short Category Name"],
    maxlength:[32,"Too Long Category name"],
  },
  //A and B => shoping.com/a-and-b
  slug:{
    type:String,
    lowercase:true,
  },
  image:String,
},
{timestamps:true}
);

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;