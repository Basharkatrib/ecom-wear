import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice'; 

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    user: userReducer, 
  },
});

export default store;
