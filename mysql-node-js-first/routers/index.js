import { ProductRouter, deleteProductRouter } from "../api/products/index.js";
import userRouter from "../api/users/index.js";
import profileRouter from "../api/users/profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = (app) => {
  app.use("/users", userRouter);
  app.use("/api/profile", authMiddleware, profileRouter);
  app.use("/api/products", ProductRouter);
  app.use("/api/deleteProducts", deleteProductRouter);
  //delete_product
};

export default router;
