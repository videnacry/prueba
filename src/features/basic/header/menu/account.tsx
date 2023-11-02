import React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import AccountCircle from "@mui/icons-material/AccountCircle";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import { logout } from "../../../complex/login/loginSlice";
import { useAppDispatch } from "../../../../app/hooks";

const Account = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
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
      <Menu
        onClick={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ManageAccounts fontSize="large" />
        </Box>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default Account;
