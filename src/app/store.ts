import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import loginReducer from "../features/complex/login/loginSlice";
import appReducer from "../AppSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
