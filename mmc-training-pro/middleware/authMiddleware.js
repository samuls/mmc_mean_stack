import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid authorization" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({ status: false, error: error.message });
      }

      req.user = decode.user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ status: false, message: error.message });
  }
};

export default authMiddleware;
