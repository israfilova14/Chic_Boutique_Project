const asyncHandler = require("../../middleware/asyncHandler");
const Product = require("../../models/productModel");

const updateProductDetails = asyncHandler(async (req, res) => {
   try {
     const { name, description, price, category, quantity, brand, countInStock } = req.fields;
     console.log(name, description, price, category, quantity, brand);
      
     // Validation
     switch (true) {
       case !name:
         return res.json({ error: "Name is required" });
       case !brand:
         return res.json({ error: "Brand is required" });
       case !description:
         return res.json({ error: "Description is required" });
       case !price:
         return res.json({ error: "Price is required" });
       case !category:
         return res.json({ error: "Category is required" });
       case !quantity:
         return res.json({ error: "Quantity is required" });
       case countInStock === undefined:
         return res.json({error: "Count in stock is required"})
     }
 
     const product = await Product.findByIdAndUpdate(
       req.params.id,
       { 
         name,
         description, 
         price,
         category,
         quantity,
         brand,
         countInStock
       },
       { new: true }
     );
     if(!product){
       return res.status(404).json({error: "Product not found"}); 
     }
     await product.save();
 
     res.json(product);
   } catch (error) {
     console.error(error);
     res.status(400).json(error.message);
   }
 });
 
module.exports = updateProductDetails