const categoryModel = require('../../models/categoryModel');
const asyncHandler = require('../../middleware/asyncHandler');

const createCategory = asyncHandler(async(req, res) => {
   try{
      const {name} = req.body;
      console.log(name);
      
      if(!name || name.trim() === ''){
         return res.status(400).json({
           error: "Name is required"
         })
      }
      
      const existingCategory = await categoryModel.findOne({name});

      if(existingCategory){
         return res.status(409).json(
          {error: "Category already exists"}
         )
      }
      // Create a new category
      const category = await new categoryModel({name}).save();
      res.status(201).json(category)
   }
   catch(error){
     console.log(error);
     return res.status(500).json(error)
   }
})

module.exports = createCategory