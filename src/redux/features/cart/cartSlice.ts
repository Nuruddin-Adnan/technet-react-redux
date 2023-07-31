/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Icart = {
  products: IProduct[];
  total: number;
};

const initialState: Icart = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing) {
        existing.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      // calculate total price for products
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity! -= 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      // calculate total price for products
      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      // calculate total price for products
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeOne, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
