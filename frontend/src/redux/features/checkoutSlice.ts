import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",
  paymentInfo: {
    status: "Not Paid",
  },
};

const checkoutSlice = createSlice({
  initialState: initialState,
  name: "checkout",
  reducers: {
    /* SHIPPING TEMPORARY LOCAL STORAGE */
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod),
      );
    },
  },
});

export const { saveShippingInfo, savePaymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
