import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "../slice/characterSlice.js";

const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export default store;
