 
const asyncHandler = require("../../middleware/asyncHandler");
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  
  if (user) {
    // Update username and email
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // If password is provided, hash and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash with default salt rounds (10)
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();
    
    // Respond with the updated user data, excluding password
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email, // I added email in the response
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = updateCurrentUserProfile;
