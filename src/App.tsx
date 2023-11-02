import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { init, selectLogin } from "./features/complex/login/loginSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Login from "./features/complex/login/Login";
import Users from "./features/complex/users/Index";
import Header from "./features/basic/header/Index";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const initThemeMode: "light" | "dark" = "dark";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectLogin);

  const [themeMode, setThemeMode] = React.useState(initThemeMode);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );
  const toggleThemeMode = React.useCallback(() => {
    setThemeMode((mode) => (mode === "dark" ? "light" : "dark"));
  }, []);

  React.useEffect(() => {
    dispatch(init()).catch((e: any) => {
      alert(JSON.stringify(e));
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      loader: () => redirect("/login"),
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => (state.isLogged ? redirect("/users") : ""),
    },
    {
      path: "users",
      element: <Users />,
      loader: () => (!state.isLogged ? redirect("/login") : ""),
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Header toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
