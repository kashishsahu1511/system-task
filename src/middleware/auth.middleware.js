const jwt = require("jsonwebtoken");

// middleware to check if user is authenticated
const Token = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;

   
    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    
    const token = authHeader.split(" ")[1];

    // verify access token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedData) => {
      if (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      
      req.user = decodedData;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Authentication failed" });
  }
};

module.exports = Token;
