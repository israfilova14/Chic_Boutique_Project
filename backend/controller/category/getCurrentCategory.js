const asyncHandler = require("../../middleware/asyncHandler");
const categoryModel = require("../../models/categoryModel");

const getCurrentCategory = asyncHandler(async(req, res) => {
   try{
     const currentCategory = await categoryModel.findOne({_id: req.params.id});
     res.json(currentCategory)
   }
   catch(error){
      console.log(error);
      return res.status(400).json(error.message);
   }
})

module.exports = getCurrentCategory