import express from "express";
import {
  accountManage,
  authUser,
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

export default router;
