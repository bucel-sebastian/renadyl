import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";
import checkoutInfoSliceReducer from "./slices/checkoutInfoSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    checkoutData: checkoutInfoSliceReducer,
  },
  devTools: true,
});
