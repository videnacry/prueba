import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  init as initLogin,
  selectLogin,
} from "./features/complex/login/loginSlice";
import { selectApp } from "./AppSlice";

import { ThemeProvider } from "@mui/material/styles";

import Login from "./features/complex/login/Login";
import Users from "./features/complex/users/Index";
import Header from "./features/basic/header/Index";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(selectApp);
  const loginState = useAppSelector(selectLogin);

  React.useEffect(() => {
    dispatch(initLogin()).catch((e: any) => {
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
      loader: () => (loginState.isLogged ? redirect("/users") : ""),
    },
    {
      path: "users",
      element: <Users />,
      loader: () => (!loginState.isLogged ? redirect("/login") : ""),
    },
  ]);

  return (
    <ThemeProvider theme={appState.theme}>
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
