import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("checkout-info")
  ? {
      ...JSON.parse(Cookies.get("checkout-info")),
      loading: true,
    }
  : {
      loading: true,
      checkoutData: null,
    };

const checkoutInfoSlice = createSlice({
  name: "checkoutInfo",
  initialState,
  reducers: {
    setCheckoutInfo: (state, action) => {
      state.checkoutData = action.payload;
      Cookies.set("checkout-info", JSON.stringify(state));
    },
  },
});

export const { setCheckoutInfo } = checkoutInfoSlice.actions;

export default checkoutInfoSlice.reducer;
