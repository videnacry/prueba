import React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";

import Account from "./menu/Account";
import Search from "./Search";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectLogin } from "../../complex/login/loginSlice";
import { selectApp, toggleTheme } from "../../../AppSlice";

const Index = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectLogin);
  const appState = useAppSelector(selectApp);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          {loginState.isLogged && <Search />}
          <Box sx={{ flexGrow: 1 }} />
          {loginState.isLogged && <Account />}
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => {
                dispatch(toggleTheme());
              }}
              color="inherit"
            >
              {appState.isDarkTheme ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Index;
