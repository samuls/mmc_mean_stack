import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid authorization",
        });
      }
      req.decode = decode;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default authMiddleware;
