import express from "express";
import { check, validationResult } from "express-validator";
import Users from "../../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log("Hi from users");
  res.send("Hello World!");
});

/*
end point : /api/users
method : POST
description : create a new user
type: public end point
1. email should be unique
2. password should be at least 6 characters long
3. save the user details in the database
4. generate the token
*/

userRouter.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Email is required").isEmail(),
  check("password", "<PASSWORD>").notEmpty(),
  check("password", "Length must be at least 6 characters long").isLength({
    min: 6,
  }),

  async (req, res) => {
    try {
      const err = validationResult(req);
      //console.log(err);
      if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
      }

      const { name, email, password } = req.body;
      let isUserExists = await Users.findOne({ email });
      // console.log(isUserExists);
      if (isUserExists) {
        return res.status(400).json({ mgs: "Email already exists" });
        //return res.send({'msg':'Email already exists'});
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = new Users({ name, email, password: encryptedPassword });
      await user.save();

      //1 set payload to the password
      // we will use the generate the token to generate the token and then pass it will generate
      const payload = {
        user: {
          id: user.id,
        },
      };
      //2 generate the token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "5 days",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).send({ ...user._doc, token });
        }
      );

      // res.status(200).json({user});

      // res.send({...req.body});
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
);

export default userRouter;
