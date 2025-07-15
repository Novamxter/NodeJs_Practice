const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: "Token required" });
  const decoded = jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Session expired. Please login again." });
      }
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
