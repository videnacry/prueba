import { createTheme, type Theme } from "@mui/material/styles";

import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "./app/store";

interface IAppState {
  isDarkTheme: boolean;
  theme: Theme;
}

const getTheme = ({ pIsDark }: { pIsDark: boolean }): Theme =>
  createTheme({
    palette: {
      mode: pIsDark ? "dark" : "light",
    },
  });

const initialState: IAppState = {
  isDarkTheme: true,
  theme: getTheme({ pIsDark: true }),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleTheme: (state) => {
      const isDark = !state.isDarkTheme;
      const newState: IAppState = {
        ...state,
        isDarkTheme: isDark,
        theme: getTheme({ pIsDark: isDark }),
      };
      return newState;
    },
  },
});

export const { toggleTheme } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectApp = (state: RootState): IAppState => state.app;

export default appSlice.reducer;
