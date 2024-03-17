import express from "express";
import { check, validationResult } from "express-validator";
import Products from "../../models/Products.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("Yes product is working");
});

productRouter.post(
  "/add",
  check("name", "Product name is required"),
  check("price", "Product price is required"),
  check("discount", "Product discount is required"),
  check("description", "Product description is required"),
  check("image", "Product image is required"),
  async (req, res) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, price, discount, description, image } = req.body;
    let product = new Products({ name, price, discount, description, image });
    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

export default productRouter;
