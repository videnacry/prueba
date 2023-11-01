import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";

import Login from "./features/login/Login";
import { init } from "./features/login/loginSlice";

import Users from "./features/users/Index";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App(): JSX.Element {

  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(init()).catch((e: any) => { alert(JSON.stringify(e)); });
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
    <RouterProvider router={router} />
  );
}

export default App;
