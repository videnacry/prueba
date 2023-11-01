import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectLogin,
  setPassword,
  setEmail,
  submitSession,
} from "./loginSlice";

import bgImg from './600w.webp';
import { Alert, LinearProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login(): JSX.Element {
  
  const state = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (state.isLogged) navigate('/users');
  }, [state.isLogged]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        { state.fetchStatus === 'loading' && <><LinearProgress color="secondary" /> <Typography variant="body1" gutterBottom>{"Loading the session."}</Typography></> }
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={state.email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value??''));
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value??''));
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    submitSession({ pEmail: state.email, pPassword: state.password }),
                  ).catch(e => { alert(JSON.stringify(e)); });
                }}
              >
                Sign In
              </Button>

              <Snackbar
                open={state.error !== null && state.error !== undefined}
                autoHideDuration={6000}
              >
                <Alert  sx={{ width: '100%' }} severity="error">{JSON.stringify(state.error?.message ?? JSON.stringify(state.error))}</Alert>
              </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

// import React, { useEffect } from "react";

// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import {
//   init,
//   selectLogin,
//   setPassword,
//   setEmail,
//   submitSession,
// } from "./loginSlice";

// export function Login(): JSX.Element {
//   const state = useAppSelector(selectLogin);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(init()).catch(e => { alert(JSON.stringify(e)); });
//   }, []);

//   return (
//     <div>
      
//       <h1>{state.fetchStatus}</h1>
//       <input
//         value={state.email}
//         onInput={(e) => {
//           dispatch(setEmail(e.currentTarget.value));
//         }}
//       />
//       <input
//         value={state.password}
//         onInput={(e) => {
//           dispatch(setPassword(e.currentTarget.value));
//         }}
//       />
//       <button
//         type="submit"
//         onClick={() => {
//           dispatch(
//             submitSession({ pEmail: state.email, pPassword: state.password }),
//           ).catch(e => { alert(JSON.stringify(e)); });
//         }}
//       >
//         login
//       </button>
//       <p>{JSON.stringify(state.error)}</p>
//     </div>
//   );
// }
