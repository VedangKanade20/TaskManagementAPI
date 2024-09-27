import express from "express";
import {
  addReview,
  getProductsOnAdminDashboard,
  getPublishedProducts,
  publishProduct,
  updateProductStatus,
  uploadImageAndCreateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protect, uploadImageAndCreateProduct);
//all admin dashboard
router.route("/admin/adminDashboard").get(admin,protect, getProductsOnAdminDashboard);
router.route("admin/reviewprod").post(admin, protect, addReview);
router.route("admin/:id/statuscheck").post(admin, protect, updateProductStatus);
router.route("admin/:id/publish").post(admin, protect, publishProduct);
router.route("/allproducts").get(protect, getPublishedProducts); //all published products

export default router;
