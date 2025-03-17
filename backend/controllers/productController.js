import mongoose from "mongoose";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

/* LIST ALL PRODUCTS => /api/v1/products */
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 12;
  /* SEARCH & FILTERS */
  const apiFilters = new APIFilters(Product, req.query).search().filters();
  let products = await apiFilters.query;
  let filteredProductsCount = products.length;
  /* PAGINATION */
  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();
  /* RESPONSE */
  res.status(200).json({ resPerPage, filteredProductsCount, products });
});

/* CREATE NEW PRODUCT => /api/v1/admin/products */
const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);
  res
    .status(200)
    .json({ msg: "Product created successfully", product: product });
});

/* GET PRODUCT BY ID => /api/v1/products/:id */
const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorHandler("Custom Error Handler: Product not found!", 404),
    );
  } else {
    res.status(200).json({ product });
  }
});

/* GET PRODUCTS - ADMIN => /api/v1/admin/products */
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ products: products });
});

/* UPDATE PRODUCT => /api/v1/admin/products/:id */
const updateProduct = catchAsyncErrors(async (req, res) => {
  let id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    new: true,
  });
  if (!product) {
    return next(
      new ErrorHandler("Custom Error Handler: Product not found!", 404),
    );
  } else {
    res
      .status(200)
      .json({ msg: "Product updated successfully", product: product });
  }
});

/* UPLOAD PRODUCT IMAGES => /api/v1/admin/products/:id/upload_images */
const uploadProductImages = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(
      new ErrorHandler("Custom Error Handler: Product not found!", 404),
    );
  }
  const uploader = async (image) => upload_file(image, "webdevbro/products");
  const urls = await Promise.all((req?.body?.images).map(uploader));
  product?.images?.push(...urls);
  await product?.save();
  res
    .status(200)
    .json({ msg: "Product updated successfully", product: product });
});

/* DELETE PRODUCT IMAGE => /api/v1/admin/products/:id/delete_images */
const deleteProductImage = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(
      new ErrorHandler("Custom Error Handler: Product not found!", 404),
    );
  }
  // delete from Cloudinary
  const isDeleted = await delete_file(req.body.imgId);
  // delete from database
  if (isDeleted) {
    product.images = product?.images?.filter((image) => {
      return image.public_id !== req.body.imgId;
    });
    await product?.save();
  }
  res.status(200).json({ msg: "Image deleted successfully", product: product });
});

/* DELETE PRODUCT => /api/v1/admin/products/:id */
const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorHandler("Custom Error Handler: Product not found!", 404),
    );
  } else {
    // delete product images
    for (let i = 0; i < product?.images?.length; i++) {
      await delete_file(product?.images[i].public_id);
    }
    await product.deleteOne();
    res.status(200).json({
      msg: "Product deleted successfully",
      deletedProduct: product,
    });
  }
});

/* CREATE PRODUCT REVIEW => /api/v1/reviews */
const createProductReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req?.user?._id,
    ratings: Number(rating),
    comment: comment,
  };
  const product = await Product.findById(productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  const isReviewed = product?.reviews.find((review) => {
    return review.user.toString() === req?.user?._id.toString();
  });
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //product.ratings = avgRating;
  product.ratings = product.reviews.reduce((acc, item) => {
    return (item.rating + acc) / product.reviews.length;
  }, 0);

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

/* GET PRODUCT REVIEWS => /api/v1/reviews */
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({
    reviews: product.reviews,
  });
});

/* DELETE PRODUCT REVIEW => /api/v1/admin/reviews/:id */
const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  const reviews = product?.reviews?.filter((review) => {
    return review._id.toString() !== req?.query?.id.toString();
  });
  const numOfReviews = reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => {
          return item.rating + acc / numOfReviews;
        }, 0);
  product = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true },
  );
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product: product,
  });
});

export {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts,
  uploadProductImages,
  deleteProductImage,
};
