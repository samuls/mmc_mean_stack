import express from "express";
import { check, validationResult } from "express-validator";
import Users from "../../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let isUserExists = await Users.findOne({ email: email });
  if (!isUserExists) {
    return res
      .status(203)
      .json({ status: false, message: "Incorrect email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, isUserExists.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ status: false, message: "Incorrect email or password" });
  }

  const payload = {
    user: {
      id: isUserExists.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        status: true,
        token: token,
        user: isUserExists,
      });
    }
  );
});

userRouter.post(
  "/signup",
  check("first_name", "First Name is required").notEmpty(),
  check("last_name", "Last Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("password", "Password is required").notEmpty(),
  async (req, res) => {
    try {
      let err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
      }

      const { first_name, last_name, email, password } = req.body;

      let isUserExists = await Users.findOne({ email: email });
      if (isUserExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = new Users({
        first_name,
        last_name,
        email,
        password: encryptedPassword,
      });
      await user.save();

      res
        .status(200)
        .json({ status: true, message: "User registered successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default userRouter;
