const asyncHandler = require('../../middleware/asyncHandler');
const productModel = require('../../models/productModel');

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity, countInStock, image } = req.body;

    if (!name || !price || !quantity || !countInStock || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Yeni məhsul əlavə edirik
    const product = new productModel({
      name,
      brand,
      description,
      price,
      category,
      quantity, // `quantity` sahəsini saxlayırıq
      countInStock,  // `countInStock` sahəsini saxlayırıq
      image,  // Cloudinary URL-inin doğru gəldiyinə əmin olun
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while adding product" });
  }
});


module.exports = addProduct;