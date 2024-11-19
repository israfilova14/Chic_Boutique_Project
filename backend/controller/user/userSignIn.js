const asyncHandler = require("../../middleware/asyncHandler");
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../../utilities/generateToken");

const userSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if user exists
  const existUser = await userModel.findOne({email});

  if (!existUser) {
    return res.status(404).json(
      { message: "User not found" }
    );
  }

  if(existUser){
      // Check if password is valid
      const isPasswordValid = await bcrypt.compare(
        password, 
        existUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json(
          {
            message: "Invalid email or password"
          }
        );
      }
      if(isPasswordValid){
         // Generate token and send the response
         generateToken(res, existUser._id);
         
         res.status(201).json(
          {
            _id: existUser._id,
            username: existUser.username,
            email: existUser.email,
            isAdmin: existUser.isAdmin,
           }
          );
          return
      }
  }
});

module.exports = userSignIn;
