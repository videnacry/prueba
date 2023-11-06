import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import loginReducer from "../features/complex/login/loginSlice";
import usersReducer from "../features/complex/users/usersSlice";
import appReducer from "../AppSlice";
import headerReducer from "../features/basic/header/headerSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    app: appReducer,
    users: usersReducer,
    header: headerReducer,
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
