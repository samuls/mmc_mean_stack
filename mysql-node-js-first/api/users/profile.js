import express from "express";
import QueryExecutor from "../../utils/QueryExc.js";
import bcrypt from "bcryptjs";

const profileRouter = express.Router();

profileRouter.get("/", async (req, res) => {
  const { id } = req.user;

  try {
    const sql =
      "SELECT id,fname,lname,address,accountType,email FROM users where id = ?";
    const result = await QueryExecutor(sql, [id]);
    if (result.length === 0) {
      res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {}
});

profileRouter.put("/", async (req, res) => {
  const { id } = req.user;
  const { fname, lname, address, accountType, email } = req.body;
  try {
    const sql =
      "update users SET fname = ?, lname = ?, address = ?, accountType = ? WHERE id = ?";
    const result = await QueryExecutor(sql, [
      fname,
      lname,
      address,
      accountType,
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ status: false, message: "Profile not updated." });
    }

    const userSql =
      "select id, fname, lname, address, accountType, email from users where id = ?";
    const result1 = await QueryExecutor(userSql, [id]);
    if (result1.length === 0) {
      res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({ status: true, data: result1 });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

profileRouter.put("/changePassword", async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const sql = "select * from users where id = ?";
    const result = await QueryExecutor(sql, [id]);
    console.log(result);
    if (result.length > 0) {
      const isMatch = await bcrypt.compare(oldPassword, result[0].password);
      if (!isMatch) {
        return res
          .status(404)
          .json({ status: false, message: "Old password not matched." });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);
      const sql = "update users SET password =? WHERE id =?";
      const result1 = await QueryExecutor(sql, [encryptedPassword, id]);
      if (result1.affectedRows === 0) {
        return res
          .status(404)
          .json({ status: false, message: "Password not updated." });
      }

      return res.status(200).json({
        status: true,
        message: "Password updated successfully.",
        data: result,
      });
    }

    return res.status(404).json({ status: false, message: "User not found" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

export default profileRouter;
