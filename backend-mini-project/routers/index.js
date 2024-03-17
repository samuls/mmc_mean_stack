import productRouter from "../api/products/index.js";
import userRouter from "../api/users/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", authMiddleware, productRouter);
};

export default router;
