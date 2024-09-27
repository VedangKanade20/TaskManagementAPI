import asyncHandler from "express-async-handler";
import AWS from "aws-sdk"; // Import AWS SDK for S3
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * @desc		Create a product with images
 * @route		POST /api/products/
 * @access	private/users
 */
const uploadImageAndCreateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const images = [];

  // Upload images to S3
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `products/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      images.push(uploadResult.Location); // Store the image URL
    }
  }

  // Create product
  const product = new Product({
    name,
    description,
    price,
    quantity,
    images,
    owner: req.user._id, // Assuming you have user info in req.user
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc		Get products on admin dashboard
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
    // approved and published
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
  addReview,
  updateProductStatus,
  getProductsOnAdminDashboard,
  publishProduct,
  getPublishedProducts,
  uploadImageAndCreateProduct,
};
