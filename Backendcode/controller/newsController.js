import {News} from "../models/newsModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";


// import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// export const addnews = catchAsyncErrors(async (req, res, next) => {

//   const { title, slug, image, category, description, autherName } = req.body;
//   if (!title || !slug || !category || !description || !autherName) {
//     return next(new ErrorHandler("Please Fill Full Form!", 400));
//   }

//   await News.create({ title, slug, image, category, description, autherName });
//   res.status(200).json({
//     success: true,
//     message: "Message Sent!",
//   });
// });


export const addnews = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image Required!", 400));
  }

  const { image } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const { title, slug, category, description, autherName } = req.body;
  if (!title 
    || !slug || !category || !description 
    || !autherName) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
  } catch (error) {
    console.error("Cloudinary Error:", error.message || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed To Upload Image To Cloudinary", 500));
  }

  try {
    const user = await News.create({
      title,
      slug,
      category,
      description,
      autherName,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "News added successfully",
      user,
    });
  } catch (error) {
    console.error("User Creation Error:", error.message || "Unknown User creation error");
    return next(new ErrorHandler("Failed To Create User", 500));
  }
});


export const updateNews = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // Assuming the ID of the news to be updated is passed in the request URL params

  // Check if the news ID is provided
  if (!id) {
    return next(new ErrorHandler("News ID is required!", 400));
  }

  // Check if the news with the provided ID exists
  const existingNews = await News.findById(id);
  if (!existingNews) {
    return next(new ErrorHandler("News not found!", 404));
  }

  // Handle image upload if provided in the request
  if (req.files && req.files.image) {
    const { image } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    // Delete the existing image from cloud storage if it exists
    if (existingNews.image && existingNews.image.public_id) {
      try {
        await cloudinary.uploader.destroy(existingNews.image.public_id);
      } catch (error) {
        console.error("Cloudinary Error:", error.message || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed To Delete Old Image From Cloudinary", 500));
      }
    }

    // Upload the new image to cloud storage
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
      existingNews.image = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Cloudinary Error:", error.message || "Unknown Cloudinary error");
      return next(new ErrorHandler("Failed To Upload New Image To Cloudinary", 500));
    }
  }

  // Update news fields if provided in the request body
  const { title, slug, category, description, autherName } = req.body;
  if (title) existingNews.title = title;
  if (slug) existingNews.slug = slug;
  if (category) existingNews.category = category;
  if (description) existingNews.description = description;
  if (autherName) existingNews.autherName = autherName;

  // Save the updated news data
  try {
    const updatedNews = await existingNews.save();
    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    console.error("News Update Error:", error.message || "Unknown news update error");
    return next(new ErrorHandler("Failed To Update News", 500));
  }
});



// Delete controller...............................................................
export const deleteNews = catchAsyncErrors(async (req, res, next) => {
  const { news_id } = req.params;

  try {
    // Check if the news with the provided ID exists
    const existingNews = await News.findById(news_id);
    if (!existingNews) {
      return next(new ErrorHandler("News not found!", 404));
    }

    // Delete the image associated with the news if it exists
    if (existingNews.image && existingNews.image.public_id) {
      await cloudinary.uploader.destroy(existingNews.image.public_id);
    }

    // Convert the existingNews object to a Mongoose document
    const newsDoc = existingNews.toObject();

    // Delete the news from the database
    await News.deleteOne({ _id: newsDoc._id });

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("News Deletion Error:", error.message || "Unknown news deletion error");
    return next(new ErrorHandler("Failed To Delete News", 500));
  }
});


// Get News By Id
export const getNewsById = catchAsyncErrors(async (req, res, next) => {
  const { news_id } = req.params;

  try {
    // Find the news item by its ID
    const newsItem = await News.findById(news_id);

    // Check if the news item exists
    if (!newsItem) {
      return next(new ErrorHandler("News not found!", 404));
    }

    res.status(200).json({
      success: true,
      news: newsItem,
    });
  } catch (error) {
    console.error("Get News by ID Error:", error.message || "Unknown error");
    return next(new ErrorHandler("Failed to retrieve news item", 500));
  }
});


// Get All News
export const getAllNews = catchAsyncErrors(async (req, res, next) => {
  try {
    // Fetch all news items from the database
    const allNews = await News.find();

    res.status(200).json({
      success: true,
      count: allNews.length,
      news: allNews,
    });
  } catch (error) {
    console.error("Get All News Error:", error.message || "Unknown error");
    return next(new ErrorHandler("Failed to retrieve all news items", 500));
  }
});


