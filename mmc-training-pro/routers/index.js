import PublicProfileRouter from "../api/profile/PublicProfiles.js";
import ProfileRouter from "../api/profile/index.js";
import authRouter from "../api/users/auth.js";
import userRouter from "../api/users/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/users/register", userRouter);
  app.use("/auth", authRouter);
  app.use("/api/profile", authMiddleware, ProfileRouter);
  app.use("/api/all-profile", PublicProfileRouter);
  // app.use("/api/git", PublicProfileRouter);
};

export default router;
