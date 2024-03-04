import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/redux/api/productsApi";
import { authApi } from "@/redux/api/authApi";
import { userApi } from "@/redux/api/userApi";
import { orderApi } from "@/redux/api/orderApi";
import searchReducer from "@/redux/features/miscSlice";
import userReducer from "@/redux/features/userSlice";
import cartReducer from "@/redux/features/cartSlice";
import checkoutReducer from "@/redux/features/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cartState: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    search: searchReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
    ]),
});
