import { User } from "../models/user.model.js";
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const generateAccessandRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return { error: error.message };
  }
};
const signup = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    if ([fullname, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existedUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      email: email.toLowerCase().trim(),
      fullname: fullname.trim(),
      password: password.trim(),
    });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      return res.status(400).json({ message: "User creation failed" });
    }
    return res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `${error}: "Internal server error"` });
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password.trim());
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const accessTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    };
    const refreshTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json({
        success: true,
        user: loggedInUser,
        message: "User logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const signout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: null },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const accessToken = user.generateAccessToken();
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({ message: "Access token refreshed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { fullname, mobileNumber, location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullname: fullname.trim() || "",
        mobileNumber: mobileNumber.trim() || "",
        location: location.trim() || "",
      },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const otp = speakeasy.totp({
      secret: process.env.SPEAKEASY_SECRET,
      encoding: "base32",
      step: 300,
    });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"Canova Forms" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });
    res.status(200).json({
      message: "OTP sent to your email successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || otp.trim() === "") {
      return res.status(400).json({ message: "OTP is required" });
    }
    const verified = speakeasy.totp.verify({
      secret: process.env.SPEAKEASY_SECRET,
      encoding: "base32",
      token: otp.trim(),
      step: 300,
      window: 2,
    });
    if (!verified) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        verified: false,
      });
    }
    const resetToken = jwt.sign(
      { email: email.trim() },
      process.env.RESET_PASSWORD_TOKEN_SECRET,
      { expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRY }
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 20 * 60 * 1000,
    };
    return res.cookie("resetToken", resetToken, options).status(200).json({
      message: "OTP verified successfully",
      verified: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const resetToken = req.cookies.resetToken;
    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!resetToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(
      resetToken,
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );
    if (decoded.email !== email.trim()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword.trim();
    await user.save({ validateBeforeSave: true });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Password is not updated", error: error.message });
  }
};
export {
  signup,
  signin,
  signout,
  refreshAccessToken,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  generateAccessandRefreshToken,
  forgotPassword,
  verifyOTP,
  updatePassword,
};


