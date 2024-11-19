const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in the environment variables!");
      throw new Error("JWT_SECRET is required for generating the token.");
    }

    // Create JWT token
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // Access token is valid for 30 days
    );

    console.log("Generated token:", token); // Debugging line

    // Set JWT as an HTTP-Only Cookie
    res.cookie('jwt', token, {
      httpOnly: true, // Makes the cookie inaccessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict', // Protect against CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return token;
  } catch (err) {
    console.error("Error generating token:", err.message);
    throw new Error("Error generating token");
  }
};

module.exports = generateToken;
