import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/api/user.api";
import { formApi } from "./slices/api/form.api";
import userReducer from "./slices/state/user.stateslice";
import formReducer from "./slices/state/formstateslice";
import formResponseReducer from "./slices/formResponseSlice";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    user: userReducer,
    form: formReducer,
    formResponse: formResponseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, formApi.middleware),
});



