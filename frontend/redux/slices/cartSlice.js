import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    checkoutData: {
      currency: null,
      countryCode: null,
      promocode: null,
      isLoggedIn: false,
      shipping: {
        address: "",
        city: "",
        cityKey: "",
        country: "",
        countryKey: "",
        email: "",
        fname: "",
        lname: "",
        password: "",
        phone: "",
        postalCode: "",
        rePassword: "",
        state: "",
        stateKey: "",
        type: "courier",
      },
      billing: {
        asShipping: true,
        address: "",
        city: "",
        cityKey: "",
        country: "",
        countryKey: "",
        email: "",
        entity: "",
        fname: "",
        lname: "",
        phone: "",
        postalCode: "",
        state: "",
        stateKey: "",
      },
      doctor: "",
      payment: "card",
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.productName === action.payload.productName
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.productName === action.payload
      );
      if (item.productName === "renal_single") {
        if (item.quantity + 1 <= 10) {
          item.quantity++;
        }
      } else {
        if (item.quantity + 1 <= 4) {
          item.quantity++;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.productName === action.payload
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.productName !== action.payload
      );
      state.cart = removeItem;
    },
    inputCartQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.productName === action.payload.productName
      );

      item.quantity = action.payload.quantity;
    },
    setPromocode: (state, action) => {
      state.checkoutData.promocode = action.payload;
    },
    removePromocode: (state, action) => {
      state.checkoutData.promocode = null;
    },
    saveOrderData: (state, action) => {
      state.checkoutData.order = action.payload;
    },
    updateCheckoutData: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      const names = name.split(".");
      if (names.length === 1) {
        state.checkoutData[names[0]] = value;
      } else if (names.length === 2) {
        state.checkoutData[names[0]][names[1]] = value;
      } else if (names.length === 3) {
        state.checkoutData[names[0]][names[1]][names[2]] = value;
      }
    },
    saveCheckoutData: (state, action) => {
      state.checkoutData.shipping = action.payload.shipping;
      state.checkoutData.billing = action.payload.billing;
      state.checkoutData.payment = action.payload.payment;
      state.checkoutData.order.shippingCost = action.payload.order.shippingCost;
      state.checkoutData.order.orderTotal = action.payload.order.orderTotal;
    },
    resetCartData: (state, action) => {
      state = {
        cart: [],
        checkoutData: {
          promocode: null,
          shipping: {
            address: "",
            city: "",
            cityKey: "",
            country: "",
            countryKey: "",
            email: "",
            fname: "",
            lname: "",
            password: "",
            phone: "",
            postalCode: "",
            rePassword: "",
            wantsAccount: false,
            state: "",
            stateKey: "",
            type: "courier",
            easybox: null,
            provider: "",
          },
          billing: {
            asShipping: true,
            address: "",
            city: "",
            cityKey: "",
            country: "",
            countryKey: "",
            email: "",
            entity: "",
            fname: "",
            lname: "",
            phone: "",
            postalCode: "",
            state: "",
            stateKey: "",
            companyCif: "",
            companyName: "",
          },
          order: {},
          doctor: "",
          payment: "card",
        },
      };
    },
    setCurrencyAndCountryCode: (state, action) => {
      state.checkoutData.countryCode = action.payload.countryCode;
      state.checkoutData.currency = action.payload.currency;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  inputCartQuantity,
  removePromocode,
  setPromocode,
  saveOrderData,
  updateCheckoutData,
  saveCheckoutData,
  setCurrencyAndCountryCode,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
