import { createBrowserRouter } from "react-router-dom";
import {
  HomeBase,
  Landing,
  About,
  ProductDetails,
  Error,
  AdminBase,
  SiteBase,
} from "./pages";
import ErrorElement from "@/components/comps/ErrorElement";
import Products from "@/pages/Products";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import NotFoundPage from "@/pages/NotFoundPage";
import Profile from "@/components/user/Profile";
import UpdateProfile from "@/components/user/UpdateProfile";
import UpdatePassword from "@/components/user/UpdatePassword";
import UploadAvatar from "@/components/user/UploadAvatar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ForgotPassword from "@/components/auth/ForgotPassword";
import PasswordReset from "@/components/auth/PasswordReset";
import Cart from "@/components/cart/Cart";
import Checkout from "@/components/cart/Checkout";
import MyOrders from "@/components/orders/MyOrders";
import MyOrderDetails from "@/components/orders/MyOrderDetails";
/* ADMIN */
import Dashboard from "@/components/admin/dashboard/Dashboard";
import ListProducts from "@/components/admin/products/ListProducts";
import NewProduct from "@/components/admin/products/NewProduct";
import UpdateProduct from "@/components/admin/products/UpdateProduct";
import UploadImagesPage from "@/components/admin/products/UploadImagesPage";
import ListAdminOrders from "@/components/admin/orders/ListAdminOrders";
import ProcessOrder from "@/components/admin/orders/ProcessOrder";
import ListUsers from "@/components/admin/users/ListUsers";
import UpdateUser from "@/components/admin/users/UpdateUser";

/* LOADERS */
//import { loader as landingLoader } from "./pages/Landing";

const router = createBrowserRouter([
  /* PRIVATE PAGES */
  {
    path: "/",
    element: <SiteBase />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomeBase />,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Landing />,
            errorElement: <ErrorElement />,
          },
          {
            path: "products",
            element: <Products />,
            errorElement: <ErrorElement />,
          },
          {
            path: "products/:id",
            element: <ProductDetails />,
            errorElement: <NotFoundPage />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "password/reset/:token",
            element: <PasswordReset />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/me/profile",
            element: (
              <ProtectedRoute admin={false}>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "me/update-profile",
            element: (
              <ProtectedRoute admin={false}>
                <UpdateProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "me/upload-avatar",
            element: (
              <ProtectedRoute admin={false}>
                <UploadAvatar />
              </ProtectedRoute>
            ),
          },
          {
            path: "me/change-password",
            element: (
              <ProtectedRoute admin={false}>
                <UpdatePassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "/cart",
            element: (
              // <ProtectedRoute admin={false}>
              //   <Cart />
              // </ProtectedRoute>
              <Cart />
            ),
          },
          {
            path: "/checkout",
            element: (
              <ProtectedRoute admin={false}>
                <Checkout />
              </ProtectedRoute>
            ),
          },
          {
            path: "/me/orders",
            element: (
              <ProtectedRoute admin={false}>
                <MyOrders />
              </ProtectedRoute>
            ),
          },
          {
            path: "/orders/:id",
            element: (
              <ProtectedRoute admin={false}>
                <MyOrderDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: "/",
        element: <AdminBase />,
        errorElement: <Error />,
        children: [
          {
            path: "/admin/dashboard",
            element: (
              <ProtectedRoute admin={true}>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/products",
            element: (
              <ProtectedRoute admin={true}>
                <ListProducts />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/new/products",
            element: (
              <ProtectedRoute admin={true}>
                <NewProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/products/:id",
            element: (
              <ProtectedRoute admin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/products/:id/upload_images",
            element: (
              <ProtectedRoute admin={true}>
                <UploadImagesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/orders",
            element: (
              <ProtectedRoute admin={true}>
                <ListAdminOrders />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/orders/:id",
            element: (
              <ProtectedRoute admin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/users",
            element: (
              <ProtectedRoute admin={true}>
                <ListUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/users/:id",
            element: (
              <ProtectedRoute admin={true}>
                <UpdateUser />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
