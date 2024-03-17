import express from "express";
import QueryExecutor from "../../utils/QueryExc.js";
import connection from "../../config/db.config.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const response = await QueryExecutor(
    "select id,fname,lname,email,address,accountType from users order by id desc"
  );

  if (response.length === 0) {
    return res.status(404).json({ status: false, message: "user not found" });
  }

  // connection.end();
  return res.status(200).json({ status: true, data: response });
});

userRouter.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const response = await QueryExecutor(
    "select id,fname,lname,email,address,accountType from users where id = " +
      id +
      " limit 1"
  );

  if (response.length === 0) {
    return res.status(404).json({ status: false, message: "user not found" });
  }

  // connection.end();
  return res.status(200).json({ status: true, data: response[0] });
});

userRouter.post(
  "/register",
  check("fname", "First name is required").notEmpty(),
  check("lname", "Last name is required").notEmpty(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required with minimum 6 length character")
    .notEmpty()
    .isLength({ min: 6 }),
  check("address", "Address is required").notEmpty(),
  check("email", "Email is required").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { fname, lname, email, password, address, accountType } = req.body;
    const sqlCheckEmail = "select email from users where email = ?";
    const response = await QueryExecutor(sqlCheckEmail, [email]);
    if (response.length > 0) {
      return res
        .status(200)
        .json({ status: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const query = `INSERT INTO users (fname, lname, email, password, address, accountType) VALUES ('${fname}','${lname}','${email}','${encryptedPassword}','${address}','${accountType}')`;
    const response1 = await QueryExecutor(query);

    const user = await QueryExecutor(
      "select * from users order by id desc limit 1"
    );
    res.status(200).json({
      status: true,
      message: "user registered successfully123",
      data: user[0],
    });
  }
);

userRouter.post(
  "/login",
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    const sqlCheckEmail = "select * from users where email =?";
    const response = await QueryExecutor(sqlCheckEmail, [email]);
    if (response.length === 0) {
      return res
        .status(200)
        .json({ status: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, response[0].password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ status: false, message: "Incorrect password" });
    }

    const payload = {
      user: {
        id: response[0].id,
        userType: response[0].user_type,
      },
    };

    jwt.sign(
      payload,
      "jwtSecret",
      {
        expiresIn: "5 days",
      },
      (err, token) => {
        if (err) {
          return res.status(400).json({ status: false, message: err.message });
        }

        res.status(200).json({ status: true, token: token, data: response });
      }
    );
  }
);

export default userRouter;
