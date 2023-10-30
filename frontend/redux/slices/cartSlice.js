import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cart")
  ? {
      ...JSON.parse(Cookies.get("cart")),
      loading: true,
    }
  : {
      loading: true,
      cartQuantity: 0,
      cartCode: null,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartQuantity + 1 < 11) {
        state.cartQuantity = state.cartQuantity + 1;
        Cookies.set("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      console.log(state.cartQuantity - 1 > 0);
      if (state.cartQuantity - 1 > 0) {
        state.cartQuantity = state.cartQuantity - 1;
        Cookies.set("cart", JSON.stringify(state));
      }
    },
    inputCartQuantity: (state, action) => {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
