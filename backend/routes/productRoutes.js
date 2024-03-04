import express from "express";
const router = express.Router();
import {
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
} from "../controllers/productController.js";
import {
  authorizedRoles,
  isAuthenticatedUser,
} from "../middlewares/authRoutes.js";

/* UNPROTECTED ROUTES */
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

/* PROTECTED ROUTES */
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getAdminProducts,
);
router.post(
  "/admin/products",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  newProduct,
);
router.put(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateProduct,
);
router.put(
  "/admin/products/:id/upload_images",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  uploadProductImages,
);
router.put(
  "/admin/products/:id/delete_image",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProductImage,
);
router.delete(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct,
);

/* REVIEWS */
router.put("/reviews", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete(
  "/admin/reviews",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProductReview,
);

export default router;
