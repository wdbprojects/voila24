import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  product: object | null;
  loading: boolean;
}

const initialState = {
  product: null,
  loading: true,
} as ProductState;

const productSlice = createSlice({
  name: productSlice,
  initialState: initialState,
  reducers: {},
});
