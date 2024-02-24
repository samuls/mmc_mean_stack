import express from "express";
import QueryExecutor from "../../utils/QueryExc.js";
import { check, validationResult } from "express-validator";
import rnd from "random";
import adminMiddleware from "../../middleware/adminMiddleware.js";

const ProductRouter = express.Router();
const deleteProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
  const sql = "select * from products where status = 'Active'";
  try {
    const result = await QueryExecutor(sql);
    console.log(result);
    if (result.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Products not found" });
    }

    return res.status(200).json({ status: true, data: result });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

/* ----------------
 * Add product
 * ---------------- */
ProductRouter.post(
  "/add_product",
  adminMiddleware,
  check("name", "Product name is required").notEmpty(),
  check("description", "Product description is required").notEmpty(),
  check("price", "Product price is required").notEmpty(),
  check("qty", "Product quantity is required").notEmpty(),
  check("unit", "Product unit is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const product_id = "PRD" + rnd.integer(111111111, 999999999);
    const sql = `insert into products (name, description, price, qty, unit, product_id) values ('${req.body.name}', '${req.body.description}', '${req.body.price}', '${req.body.qty}', '${req.body.unit}', '${product_id}')`;
    try {
      const result = await QueryExecutor(sql);
      console.log(result);
      if (result.affectedRows === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Product not added" });
      }

      const result1 = await QueryExecutor(
        "select * from products where id = ?",
        [result.insertId]
      );

      if (result1.length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Product not found." });
      }

      return res.status(200).json({ status: true, data: result1 });
    } catch (err) {
      return res.status(400).json({ status: false, message: err.message });
    }
  }
);

/* ----------------
 * Update product
 * ---------------- */
ProductRouter.put("/:product_id", adminMiddleware, async (req, res) => {
  const { product_id } = req.params;
  const sql1 = "select * from products where id = ?";
  const result1 = await QueryExecutor(sql1, [product_id]);
  if (result1.length === 0) {
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  }

  const sql = `update products set name = '${req.body.name}', description = '${req.body.description}', price = '${req.body.price}', qty = '${req.body.qty}', unit = '${req.body.unit}' where id = '${product_id}'`;
  const result = await QueryExecutor(sql);
  if (result.length === 0) {
    return res
      .status(404)
      .json({ status: false, message: "Product details not updated" });
  }

  const sql2 = "select * from products where id = ?";
  const result2 = await QueryExecutor(sql2, [product_id]);
  return res.status(200).json({ status: true, data: result2 });
});

/* ----------------
 * Delete product
 * ---------------- */

deleteProductRouter.put("/:product_id", adminMiddleware, async (req, res) => {
  const { product_id } = req.params;
  const sql1 = "select * from products where id =?";
  const result1 = await QueryExecutor(sql1, [product_id]);
  if (result1.length === 0) {
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  }

  const sql = `update products set status = 'Inactive' where id = '${product_id}'`;
  const result = await QueryExecutor(sql);
  if (result.length === 0) {
    return res
      .status(404)
      .json({ status: false, message: "Product not deleted" });
  }

  return res
    .status(200)
    .json({ status: true, message: "Product deleted successfully" });
});

export { ProductRouter, deleteProductRouter };
