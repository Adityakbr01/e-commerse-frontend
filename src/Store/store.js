import { configureStore } from "@reduxjs/toolkit";
import counterRedcuer from "./features/counter/counter";
import cartReducer from "./features/Cart/Cart_Store";
export const store = configureStore({
  reducer: {
    counter: counterRedcuer,
    cart: cartReducer,
  },
});
