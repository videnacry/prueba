import React from "react";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Login } from "./features/login/Login";

function App(): JSX.Element {
  return (
      <Login />
  );
}

export default App;
