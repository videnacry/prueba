import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  init,
  selectLogin,
  setPassword,
  setEmail,
  submitSession,
} from "./loginSlice";

export function Login(): JSX.Element {
  const state = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init()).catch(e => { alert(JSON.stringify(e)); });
  }, []);

  return (
    <div>
      <h1>{state.fetchStatus}</h1>
      <input
        value={state.email}
        onInput={(e) => {
          dispatch(setEmail(e.currentTarget.value));
        }}
      />
      <input
        value={state.password}
        onInput={(e) => {
          dispatch(setPassword(e.currentTarget.value));
        }}
      />
      <button
        type="submit"
        onClick={() => {
          dispatch(
            submitSession({ pEmail: state.email, pPassword: state.password }),
          ).catch(e => { alert(JSON.stringify(e)); });
        }}
      >
        login
      </button>
      <p>{JSON.stringify(state.error)}</p>
    </div>
  );
}
