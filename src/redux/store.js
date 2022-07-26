import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CategoriesReducer } from "../features/categories/CategoriesSlice";
import { CurrencyReducer } from "../features/currency-switcher/CurrencySlice";
import { ProductsReducer } from "../features/products/ProductsSlice";
import { ProductReducer } from "../features/products/ProductSlice";
import { CartReducer } from "../features/cart/CartSlice";

const rootReducer = combineReducers({
  CategoriesReducer,
  CurrencyReducer,
  ProductsReducer,
  ProductReducer,
  CartReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 0,
    blacklist: ["ProductsReducer", "ProductReducer"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
