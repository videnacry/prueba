import React, { useCallback, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAppDispatch } from "./app/hooks";
import { init } from "./features/complex/login/loginSlice";

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
  const [themeMode, setThemeMode] = React.useState(initThemeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );
  const toggleThemeMode = useCallback(() => {
    setThemeMode((mode) => (mode === "dark" ? "light" : "dark"));
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(init()).catch((e: any) => {
      alert(JSON.stringify(e));
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "users",
      element: <Users />,
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
