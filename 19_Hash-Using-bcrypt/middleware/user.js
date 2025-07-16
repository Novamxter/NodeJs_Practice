const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {
      req.flash("error", "Token required");
      return res.redirect("/user/login");
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          req.flash("error", "Session Expired! Login again");
        }
        req.flash("error", "Invalid Token");
        return res.redirect("/user/login");
      }
      req.user = user;
      next();
    });
};


//Using async/await 
// exports.verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     req.flash("error", "Token required");
//     return res.redirect("/user/login");
//   }

//   try {
//     const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       req.flash("error", "Session Expired! Login again");
//     } else {
//       req.flash("error", "Invalid Token");
//     }
//     return res.redirect("/user/login");
//   }
// };
