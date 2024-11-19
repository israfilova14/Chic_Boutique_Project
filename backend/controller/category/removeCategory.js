const asyncHandler = require("../../middleware/asyncHandler");
const categoryModel = require("../../models/categoryModel");

const removeCategory = asyncHandler(async(req, res) => {
   try{
      const removedCategory = await categoryModel.findByIdAndDelete(req.params.categoryId);
      res.json(removedCategory);
   }
   catch(error){
      console.log(error);
      res.status(500).json(
        {
         error: "Internal server error"
        }
      )
   }
})

module.exports = removeCategory