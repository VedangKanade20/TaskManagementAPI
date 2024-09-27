import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6001;

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `products/${Date.now().toString()}_${file.originalname}`); // File name format
    },
  }),
});

// Endpoint to upload product images
app.post("/api/products/upload", upload.array("images", 5), (req, res) => {
  const imageUrls = req.files.map((file) => file.location);
  res.json({ imageUrls }); // Respond with the image URLs
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
