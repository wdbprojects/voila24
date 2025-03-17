import mongoose from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import saveTokenInCookie from "../utils/sendToken.js";
//import sendToken from "../utils/sendToken.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { delete_file, upload_file } from "../utils/cloudinary.js";

/* REGISTER USER -> POST /api/v1/register */
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
  });
  // SAVE TOKEN IN COOKIE
  saveTokenInCookie(user, 200, res);
});

/* LOGIN USER -> POST /api/v1/login */
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and value", 400));
  }
  // FIND USER IN THE DATABASE
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // CHECK IF PASSWORD IS CORRECT
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // SAVE TOKEN IN COOKIE
  saveTokenInCookie(user, 200, res);
});

/* LOGOUT USER -> POST /api/v1/logout */
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    SameSite: "none",
    Secure: true,
  });
  /* res.clearCookie("token", {
    domain: "https://rich-pink-brown-bear-gear.cyclic.app",
    path: "/",
  }); */
  res.status(200).json({
    message: "User logged out",
  });
});

/* UPLOAD USER AVATAR  -> POST /api/v1/me/upload_avatar */
const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const avatarResponse = await upload_file(
    req.body.avatar,
    "webdevbro/avatars",
  );

  // REMOVE PREVIOUS AVATAR
  if (req?.user?.avatar?.url) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });
  res.status(200).json({
    user: user,
    message: "Avatar updated successfully",
  });
});

/* FORGOT PASSWORD -> POST /api/v1/password/forgot */
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // FIND USER IN THE DATABASE
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  // GET RESET PASSWORD TOKEN
  const resetToken = user.getResetPasswordToken();
  // SAVE USER WITH NEW VALUES IN DATABASE
  await user.save();
  // CREATE RESET PASSWORD URL & EMAIL MESSAGE
  const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const emailMessage = getResetPasswordTemplate(user?.username, resetURL);
  //SEND EMAIL
  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message: emailMessage,
    });
    res.status(200).json({
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(err.message, 500));
  }
});

/* RESET PASSWORD -> POST /api/v1/password/reset/:token */
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // HASH THE URL TOKEN
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // FIND USER
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // RETURN ERROR IF USER DOES NOT EXISTS
  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400,
      ),
    );
  }
  // CHECK IF NEW PASSWORD AND CONFIRM PASSWORD MATCH
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  // SET NEW PASSWORD
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  // SAVE TOKEN IN COOKIE
  saveTokenInCookie(user, 200, res);
});
// GET CURRENT USER PROFILE -> GET /api/v1/me
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  res.status(200).json({ user: user });
});
// UPDATE USER PASSWORD -> PUT /api/v1/password/update
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");
  // check previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Current password is incorrect", 400));
  }
  user.password = req.body.password;
  user.save();
  res.status(200).json({ success: true, user: user });
});
// UPDATE USER PROFILE -> PUT /api/v1/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
  };
  const options = {
    new: true,
  };
  const user = await User.findByIdAndUpdate(
    req?.user?._id,
    newUserData,
    options,
  );
  res.status(200).json({ success: true, user: user });
});
//  GET ALL USERS - ADMIN -> GET /api/v1/admin/users
const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users: users });
});
//  GET USER BY ID - ADMIN -> GET /api/v1/admin/users/:id
const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User not found with ID: ${req.params.id}`, 404),
    );
  res.status(200).json({ success: true, user: user });
});
// UPDATE USER BY ID - ADMIN -> PUT /api/v1/admin/users/:id
const updateUserById = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };
  const options = {
    new: true,
  };
  const user = await User.findByIdAndUpdate(
    req.params.id,
    newUserData,
    options,
  );
  res.status(200).json({ success: true, user: user });
});
//  DELETE USER BY ID - ADMIN -> DELETE /api/v1/admin/users/:id
const deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User not found with ID: ${req.params.id}`, 404),
    );
  // Remove user avatar from cloudinary
  if (user?.avatar?.public_id) {
    await delete_file(user?.avatar?.public_id);
  }

  await user.deleteOne();
  res.status(200).json({ success: true, user: user });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  uploadAvatar,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
