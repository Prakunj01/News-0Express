import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";




export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, phone, email, password, role } =
    req.body;
  if (
    !name ||
    !phone ||
    !email ||
    !password ||
    !role 
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    name,
    phone,
    email,
    password,
    role,
  });
  generateToken(user, "User Registered!", 200, res);
});

export const userlogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  generateToken(user, "Login Successfully!", 201, res);
});

export const addnewuser = catchAsyncErrors(async (req, res, next) => {
  const { name, phone, email, password, role } =
    req.body;
  if (
    !name ||
    !phone ||
    !email ||
    !role ||
    !password 
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    name,
    phone,
    email,
    password,
    role,
  });
  res.status(200).json({
    success: true,
    message: "New User Registered",
    admin,
  });
});

// export const addnewdoctor = catchAsyncErrors(async (req, res, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("image Required!", 400));
//   }
//   const { image } = req.files;
//   const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//   if (!allowedFormats.includes(image.mimetype)) {
//     return next(new ErrorHandler("File Format Not Supported!", 400));
//   }
//   const {
//       name,
//       phone,
//       email,
//       password,
//       role,
//   } = req.body;
//   if (
//     !name ||
//     !phone ||
//     !email ||
//     !password ||
//     !role
//   ) {
//     return next(new ErrorHandler("Please Fill Full Form!", 400));
//   }
//   const isRegistered = await User.findOne({ email });
//   if (isRegistered) {
//     return next(
//       new ErrorHandler("User With This Email Already Exists!", 400)
//     );
//   }
//   const cloudinaryResponse = await cloudinary.uploader.upload(
//     image.tempFilePath
//   );
//   if (!cloudinaryResponse || cloudinaryResponse.error) {
//     console.error(
//       "Cloudinary Error:",
//       cloudinaryResponse.error || "Unknown Cloudinary error"
//     );
//     return next(
//       new ErrorHandler("Failed To Upload User Image To Cloudinary", 500)
//     );
//   }

//   const user = await User.create({
//     name,
//     phone,
//     email,
//     password,
//     role,
//     image: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });
//   res.status(200).json({
//     success: true,
//     message: "New User Registered",
//     user,
//   });
// });

export const getAllWriter = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "writer" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});



// Delete user route
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const {userId} = req.params;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Remove user from the database
  // await user.remove();
      // Convert the existingNews object to a Mongoose document
      const userDoc = user.toObject();

      // Delete the news from the database
      await User.deleteOne({ _id: userDoc._id });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});



