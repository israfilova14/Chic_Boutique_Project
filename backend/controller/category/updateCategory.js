const asyncHandler = require("../../middleware/asyncHandler");
const categoryModel = require("../../models/categoryModel");

const updateCategory = asyncHandler(async(req, res) => {
   try{
      const {name} = req.body;
      const {categoryId} = req.params;

      const category = await categoryModel.findOne({_id: categoryId});

      if(!category){
         return res.status(404).json(
          {
             error: "Category not found"
          }
         )
      }

      category.name = name;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
   }
   catch(error){
      console.error(error);
      res.status(500).json(
        {
          error: "Internal server error"
        }
      )
   }
})

module.exports = updateCategory