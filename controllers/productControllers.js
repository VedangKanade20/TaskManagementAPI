import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

/**
 * @desc		Create a product
 * @route		POST /api/products/
 * @access	private/users
 */
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, ownerId } = req.body;

  const owner = await User.findById(ownerId);
  if (!owner) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the user is an admin
  if (owner.isAdmin) {
    return res
      .status(403)
      .json({ message: "Admins are not allowed to post products" });
  }
  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    owner: owner._id,
  });

  res.status(201).json(product);
});

/**
 * @desc		Create a product
 * @route		GET /api/products/admin/onAdminDashboard
 * @access	private/users
 */
const getProductsOnAdminDashboard = asyncHandler(async (req, res) => {
  const products = await Product.find({ owner: req.user._id });

  res.status(200).json(products);
});

/**
 * @desc		Create a new review
 * @route		POST /api/products/admin/reviewprod
 * @access	private/only admin
 */
const addReview = asyncHandler(async (req, res) => {
  const { productId, reviewText, rating, adminReviewerId } = req.body;

  const admin = await User.findById(adminReviewerId);
  if (!admin || !admin.isAdmin) {
    return res.status(403).json({ message: "Only admins can add reviews" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const review = {
    reviewText,
    rating,
    adminReviewer: admin._id,
  };

  product.reviews.push(review);
  await product.save();

  res.status(201).json(product);
});

/**
 * @desc    Approve or reject a product
 * @route   PUT /api/products/admin/:id/statuscheck
 * @access  Private/Admin only
 */
const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'approve' or 'reject'

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (action === "approve") {
    //  approved and published
    product.status = "approved";
    product.isPublished = true;
    await product.save();

    res.status(200).json({
      message: "Product approved and published for users",
      product,
    });
  } else if (action === "reject") {
    // rejected and not published
    product.status = "rejected";
    product.isPublished = false;
    await product.save();

    res.status(200).json({
      message: "Product rejected",
      product,
    });
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }
});

import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 * @desc      Publish a product
 * @route     PUT /api/products/:id/publish
 * @access    private/admin
 */
const publishProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Check if the product is approved
  if (product.status !== "approved") {
    return res
      .status(400)
      .json({ message: "Only approved products can be published" });
  }

  product.published = true;

  await product.save();

  res.status(200).json({ message: "Product published successfully", product });
});

/**
 * @desc      Get all published products
 * @route     GET /api/products/published
 * @access    public
 */
const getPublishedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ published: true });

  if (!products.length) {
    return res.status(404).json({ message: "No published products found" });
  }

  res.status(200).json(products);
});

export {
  createProduct,
  addReview,
  updateProductStatus,
  getProductsOnAdminDashboard,
  publishProduct,
  getPublishedProducts,
};
