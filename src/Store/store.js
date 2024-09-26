import { configureStore } from "@reduxjs/toolkit";
import counterRedcuer from "./features/counter/counter";
import cartReducer from "./features/Cart/Cart_Store";
import { user_Api } from "./features/Api/user_Api";
import { userReducer } from "./features/user_Reducer";

export const store = configureStore({
  reducer: {
    counter: counterRedcuer,
    cart: cartReducer,
    [user_Api.reducerPath]: user_Api.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    user_Api.middleware,
  ],
});
