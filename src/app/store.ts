import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import loginReducer from "../features/complex/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
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
