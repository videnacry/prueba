import React, { useCallback, useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";

import { AppBar, Box, createTheme, IconButton, ThemeProvider, Toolbar, Typography, InputBase, Menu, MenuItem, Button } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Brightness4, Brightness7, AccountCircle, Search as SearchIcon, ManageAccounts  } from '@mui/icons-material';

import Login from "./features/complex/login/Login";
import { init, logout } from "./features/complex/login/loginSlice";

import Users from "./features/complex/users/Index";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const initThemeMode:'light'|'dark' = 'dark';

function App(): JSX.Element {

  const [themeMode, setThemeMode] = React.useState(initThemeMode);

  const theme = useMemo( () => createTheme({
    palette: {
      mode: themeMode,
    },
  }), [themeMode]);
  const toggleThemeMode = useCallback( () => { setThemeMode(mode => mode === 'dark' ? 'light' : 'dark'); }, []);
  
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
          <ManageAccounts />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem>
        <Button variant="contained" color="error" onClick={() => { dispatch(logout()); }}>
          Log out
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex' } }}>
            <IconButton sx={{ ml: 1 }} onClick={toggleThemeMode} color="inherit">
              {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
