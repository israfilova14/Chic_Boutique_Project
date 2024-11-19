const asyncHandler = require('../../middleware/asyncHandler.js');
const userModel = require('../../models/userModel.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utilities/generateToken.js'); 

const userSignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  if(!username || !email || !password){
      throw new Error("Please fill all the inputs")
  }

  const userExists = await userModel.findOne({email});
  if (userExists){
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating new user
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();

    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } 
  catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid user data' });
  }
});

module.exports = userSignUp;
