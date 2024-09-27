import express from "express";
import {
  accountManage,
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect, userOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router
  .route("/manageacc")
  .post(protect, accountManage)
  .get(protect, accountManage);
router.route("/logout").delete(protect, logoutUser);

export default router;
