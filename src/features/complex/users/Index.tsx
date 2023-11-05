import * as React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectUsers, getUsers, changePage } from "./usersSlice";

const Users = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector(selectUsers);

  React.useEffect(() => {
    dispatch(getUsers()).catch((e: any) => {
      alert(JSON.stringify(e));
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {usersState.page.users?.map((user: any) => (
              <Grid
                item
                key={user.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ position: "relative" }}
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    position: "relative",
                    pt: "100%",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      position: "absolute",
                      top: "6%",
                      left: "6%",
                      width: "59%",
                      pt: "75%",
                      borderRadius: 1,
                      backgroundPosition: "bottom",
                    }}
                    image={user.avatar}
                  />
                  <AppBar
                    sx={{
                      position: "absolute",
                      right: "6%",
                      width: "30%",
                      height: "100%",
                    }}
                  >
                    <Toolbar
                      sx={{ display: "flex", flexDirection: "column", pt: 3 }}
                    >
                      <Typography>{user.first_name}</Typography>
                      <Typography>{user.last_name}</Typography>
                    </Toolbar>
                  </AppBar>
                  <Paper
                    elevation={8}
                    square={false}
                    sx={{
                      position: "absolute",
                      bottom: "2%",
                      width: "100%",
                      height: "18%",
                    }}
                  >
                    <AppBar sx={{ position: "relative", height: "100%" }}>
                      <Toolbar
                        sx={{ height: "100%" }}
                        style={{ minHeight: "46px" }}
                      >
                        <Typography
                          variant="body1"
                          component="h1"
                          sx={{ flexGrow: 1 }}
                        >
                          {user.email}
                        </Typography>
                      </Toolbar>
                    </AppBar>
                  </Paper>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", p: 6 }}>
            <Pagination
              onChange={(e, pageNum) => {
                dispatch(changePage(pageNum));
              }}
              count={usersState.totalPages}
              variant="outlined"
              shape="rounded"
              sx={{ margin: "auto" }}
            />
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Users;
