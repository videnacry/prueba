import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import {
  fetchUsers,
  fetchUsersArgs,
  fetchUsersRes,
  IUser,
  getUsersSortedByAName,
} from "./usersAPI";

export interface IUsersState {
  page: number;
  amount: number;
  fetchStatus: "idle" | "loading" | "failed";
  fetchRes: fetchUsersRes;
  error: any;
}

const initialState: IUsersState = {
  page: 0,
  amount: 100,
  fetchRes: {
    users: [],
    totalPages: 0,
    totalUsers: 0,
    error: { message: undefined },
  },
  fetchStatus: "idle",
  error: { message: undefined },
};

export const getUsers = createAsyncThunk(
  "users/get",
  async (pFetchParams: fetchUsersArgs) => {
    try {
      const res: fetchUsersRes = await fetchUsers(pFetchParams);
      return res;
    } catch (e: any) {
      const res: fetchUsersRes = {
        users: [],
        totalPages: 0,
        totalUsers: 0,
        error: e.message,
      };
      return res;
    }
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      const pUsers: IUser[] = state.fetchRes.users ?? [];
      const users = getUsersSortedByAName({ pUsers, pName: action.payload });
      const newFetchRes = { ...state.fetchRes, users };
      return { ...state, fetchRes: newFetchRes };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        return { ...state, fetchStatus: "idle", fetchRes: action.payload };
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error;
      });
  },
});

export const { search } = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLogin = (state: RootState): IUsersState => state.users;

export default usersSlice.reducer;
