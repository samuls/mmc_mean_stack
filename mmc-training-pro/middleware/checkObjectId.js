import mongoose from "mongoose";

const checkObjectId = (objectId) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[objectId])) {
    return res.status(404).json({ message: "Invalid Id" });
  }
  next();
};

export default checkObjectId;
