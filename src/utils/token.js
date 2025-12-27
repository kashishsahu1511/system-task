const jwt = require("jsonwebtoken");


const generateAccessToken = (userId) => {
  // payload contains user id
  return jwt.sign(
    { userId: userId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m" // access token expires quickly
    }
  );
};


const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d" // refresh token valid for 7 days
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
