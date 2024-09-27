import express from "express";
import {
  addReview,
  createProduct,
  getProductsOnAdminDashboard,
  publishProduct,
  updateProductStatus,
} from "../controllers/productControllers";
import { admin, protect, userOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/create").post(userOnly, protect, createProduct);
router
  .route("/admin/adminDashboard")
  .get(admin, protect, getProductsOnAdminDashboard);
router.route("admin/reviewprod").post(admin, protect, addReview);
router.route("admin/:id/statuscheck").post(admin, protect, updateProductStatus);
router.route("admin/:id/publish").post(admin, protect, publishProduct);
router.route("/allproducts").get(protect, publishProduct);

export default router;
