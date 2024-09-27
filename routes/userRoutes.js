import express from "express";
import {
  accountManage,
  authUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router
  .route("/home/manageAcc")
  .post(protect, accountManage)
  .get(protect, accountManage);

export default router;
