// const asyncHandler = require("../../middleware/asyncHandler");
// const productModel = require("../../models/productModel");

// const addProductReview = asyncHandler(async(req, res) => {
//    try{
//      const {rating, comment} = req.body;
//      const product = await productModel.findById(req.params.id);

//      if(product){
//        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

//       if(alreadyReviewed){
//         res.status(400)
//         throw new Error("Product already reviewed")
//       }

//       const review = {
//         name: req.user.username,
//         rating: Number(rating),
//         comment,
//         user: req.user._id
//       }

//       product.review.push(review)
//       product.numReviews = product.reviews.lehgth

//       product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.lehgth

//       await product.save();
//       res.status(201).json(
//         {
//           message: "Review added"
//         }
//       )
//      }
//      else{
//        res.status(404)
//        throw new Error("Product not found")
//      }
//    }
//    catch(error){
//      console.error(error);
//      res.status(404).json(error.message)
//    }
// })

// module.exports = addProductReview
const asyncHandler = require("../../middleware/asyncHandler");
const productModel = require("../../models/productModel");

const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productModel.findById(req.params.id);

  if (product) {
    // İstifadəçinin artıq rəy verib-vermədiyini yoxlayır
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // Yeni rəyi yaradır
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Rəyi əlavə edir və statistikaları yeniləyir
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = addProductReview;
