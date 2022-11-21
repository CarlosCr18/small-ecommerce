import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../storeReducers/cart/cartSlice";
import { api } from "../storeReducers/apiSlice/apiSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer, //
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
