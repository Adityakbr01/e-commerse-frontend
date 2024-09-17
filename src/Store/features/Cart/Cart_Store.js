import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        state.totalAmount +=
          action.payload.price * (action.payload.quantity || 1);
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
        state.totalQuantity++;
        state.totalAmount +=
          action.payload.price * (action.payload.quantity || 1);
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= action.payload.quantity || 1;
        state.totalAmount -=
          action.payload.price * (action.payload.quantity || 1);
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
          state.totalQuantity--;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
