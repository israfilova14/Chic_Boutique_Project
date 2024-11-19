const asyncHandler = require("../../middleware/asyncHandler");
const categoryModel = require("../../models/categoryModel");

const categoryList = asyncHandler(async(req, res) => {
    try{
      const allCategories = await categoryModel.find({});
      res.json(allCategories);
    }
    catch(error){
       console.log(error);
       return res.status(400).json(error.message);
    }
})

module.exports = categoryList