import { Schema } from "mongoose";

const reviewSchema = Schema({
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  adminReviewer: {
    type: Schema.Types.ObjectId,
    ref: "User", // admins can here, since its under use schema
    required: true, // only admin can review
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  images: {
    type: [String],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // ref to User model (only users can)
    required: true,
  },
  reviews: [reviewSchema],
});
