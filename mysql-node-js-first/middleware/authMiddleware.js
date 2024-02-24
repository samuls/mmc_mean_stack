import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authToken = req.header("x-auth-token");
  if (!authToken) {
    return res.status(401).send({
      message: "Invalid authorization",
    });
  }

  try {
    jwt.verify(authToken, "jwtSecret", (err, result) => {
      if (err) {
        return res.status(401).send({
          message: "Oops! You are not authorized, Contact your administrator.",
        });
      }

      req.user = result.user;
      next();
    });
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: error.message,
    });
  }
};

export default authMiddleware;
