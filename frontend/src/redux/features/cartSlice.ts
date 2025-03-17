import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

/* interface CartState {
  cartItems: array | null;
} */

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shippingCost: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

const cartSlice = createSlice({
  initialState: getCartFromLocalStorage(),
  name: "cart",
  reducers: {
    addItem: (state, action) => {
      const productItem = action.payload;
      const item = state.cartItems.find((item) => {
        return item.productId === productItem.productId;
      });
      if (item) {
        item.amount += productItem.amount;
      } else {
        state.cartItems.push(productItem);
      }
      state.numItemsInCart += productItem.amount;
      state.cartTotal += productItem.price * productItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart successfully");
    },
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, action) => {
      const cartID = action.payload;
      const product = state.cartItems.find((item) => {
        return item.productId === cartID;
      });
      state.cartItems = state.cartItems.filter((item) => {
        return item.productId !== cartID;
      });
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },
    editItem: (state, action) => {
      const { value, cartID } = action.payload;
      const item = state.cartItems.find((currentItem) => {
        return currentItem.productId === cartID;
      });
      state.numItemsInCart += value - item.amount;
      state.cartTotal += item.price * (value - item.amount);
      item.amount = value;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated successfully");
    },
    calculateTotals: (state) => {
      state.tax = Math.round(0.1494 * state.cartTotal);
      state.orderTotal = state.cartTotal + state.shippingCost + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
