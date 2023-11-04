import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { init as initAPI, type loginParams, fetchLogin } from "./loginAPI";

export interface ILoginState {
  email: string;
  password: string;
  fetchStatus: "idle" | "loading" | "failed";
  isLogged: boolean;
  error: any;
}

const initialState: ILoginState = {
  email: "",
  password: "",
  fetchStatus: "idle",
  isLogged: false,
  error: null,
};

let storage: {
  remove: () => void;
  save: (
    { pEmail, pPassword }: loginParams,
    pStorageName?: string | undefined,
  ) => Promise<{
    error: any;
  }>;
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const init = createAsyncThunk("login/init", async () => {
  const { removeStorage, storageSession, setStorage } = await initAPI({});
  storage = { remove: removeStorage, save: setStorage };
  // The value we return becomes the `fulfilled` action payload
  return storageSession;
});

export const submitSession = createAsyncThunk(
  "login/submit-session",
  async (pLoginParams: loginParams) => {
    let couldLog = false;
    try {
      const { isLogged, error: fetchError } = await fetchLogin(pLoginParams);
      couldLog = isLogged;
      if (isLogged) {
        const { error: storageError } = await storage.save(pLoginParams);
        if (storageError !== null) return { isLogged, error: storageError };
      }
      return { isLogged, error: fetchError };
    } catch (e) {
      return {
        isLogged: couldLog,
        error: e,
      };
    }
  },
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.email = "";
      state.password = "";
      storage.remove();
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(submitSession.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(submitSession.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        state.isLogged = action.payload.isLogged;
        state.error = action.payload.error;
      })
      .addCase(submitSession.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error;
      })
      .addCase(init.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(init.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        state.error = action.payload.error;
        state.isLogged = action.payload.isLogged;
      })
      .addCase(init.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error;
      });
  },
});

export const { setEmail, setPassword, logout } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLogin = (state: RootState): ILoginState => state.login;

export default loginSlice.reducer;
