import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import { check, validationResult } from "express-validator";
import transporter from "../db/nodemailconfiger.js";
import generateToken from "../utils/generateToken.js";

// Utility function to send email acc to user
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
};

//actual controller functions start from here

/**
 * @desc		Auth user
 * @route		POST /api/users/login
 * @access	public
 */
const authUser = [
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password is required").notEmpty(),

  asyncHandler(async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      sendEmail(
        user.email,
        "Login Notification",
        `Hello ${user.name},\n\nYou have successfully logged into your account.\n\nBest regards,\nYour Company Name`
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      res.status(200, "Logged in successfully");
    } else {
      res.status(401);
      throw new Error("Invalid email or password.");
    }
  }),
];

/**
 * @desc		Register new user
 * @route		POST /api/users
 * @access	public
 */
const registerUser = [
  //validations during registration
  check("name", "Name is required").notEmpty(),
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password must be at least 8 characters long")
    .isLength({ min: 8 })
    .notEmpty()
    .withMessage("Password is required"),

  asyncHandler(async (req, res) => {
    //handling of validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400); // Bad request
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
      // Send a notification email
      sendEmail(
        user.email,
        "Welcome to Our Service",
        `Hello ${user.name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nYour Company Name`
      );
      // 201 - Successfully created
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      res.message(200, "Registered successfully");
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),
];

/**
 * @desc    View and update user profile
 * @route   GET/PUT /api/users/profile
 * @access  private
 */
const accountManage = [
  // all validation
  check("name", "Name is required").notEmpty(),
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password must be at least 8 characters long")
    .optional()
    .isLength({ min: 8 }),

  asyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Handle validation errors
    if (req.method === "PUT") {
      //  validation err
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Updation here
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password; // You might want to hash this password before saving
      }

      const updatedUser = await user.save();

      // Send a notification email upon account update
      sendEmail(
        updatedUser.email,
        "Account Update Notification",
        `Hello ${updatedUser.name},\n\nYour account details have been successfully updated.\n\nBest regards,\nYour Company Name`
      );

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }

    // If the request is GET:
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.status(200, "Updated");
  }),
];

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
});

export { authUser, registerUser, accountManage, logoutUser };
