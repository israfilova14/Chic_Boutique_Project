 const express = require('express');
 const router = express.Router();
 // Controller imports
 const userSignUp = require('../controller/user/userSignUp.js');
 const userSignIn = require('../controller/user/userSignIn.js');
 const logoutCurrentUser = require('../controller/user/logoutCurrentUser.js');
 const getAllUsers = require('../controller/user/getAllUsers.js');
 const getCurrentUserProfile = require('../controller/user/getCurrentUserProfile.js');
 const updateCurrentUserProfile = require('../controller/user/updateCurrentUserProfile.js');
 const deleteUserById = require('../controller/user/deleteUserById.js');
 const getUserById = require('../controller/user/getUserById.js');
 const updateUserById = require('../controller/user/updateUserById.js');
 const {authenticate} = require('../middleware/authMiddleware.js');
 const {authorizeAdmin} = require('../middleware/authMiddleware.js')

 router.post("/sign-up", userSignUp), 
 router.post("/sign-in", userSignIn);
 router.get("/all-users", authenticate, authorizeAdmin, getAllUsers); 
 router.get("/logout-user", logoutCurrentUser);
 router
 .route("/profile")
 .get(authenticate, getCurrentUserProfile)
 .put(authenticate, updateCurrentUserProfile);
 // ADMIN ROUTES
 router
 .route("/admin/:id")
 .delete(authenticate, authorizeAdmin, deleteUserById)
 .get(authenticate, authorizeAdmin, getUserById)
 .put(authenticate, authorizeAdmin, updateUserById)
 
 module.exports = router