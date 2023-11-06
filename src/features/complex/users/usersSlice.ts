import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import {
  fetchUsers,
  type fetchUsersRes,
  type IUser,
  getUsersSortedByAName,
} from "./usersAPI";

export interface IPage {
  num: number;
  users: IUser[];
}
export interface IUsersState {
  page: IPage;
  totalPages: number;
  fetchStatus: "idle" | "loading" | "failed";
  fetchRes: fetchUsersRes;
  error: any;
}

const initialState: IUsersState = {
  page: {
    num: 0,
    users: [],
  },
  totalPages: 0,
  fetchRes: {
    users: [],
    totalPages: 0,
    totalUsers: 0,
    error: { message: undefined },
  },
  fetchStatus: "idle",
  error: { message: undefined },
};

export const getUsers = createAsyncThunk("users/get", async () => {
  try {
    const res: fetchUsersRes = await fetchUsers({ pPageNum: 1, pAmount: 100 });
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
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      const pUsers: IUser[] = state.fetchRes.users ?? [];
      const users = getUsersSortedByAName({ pUsers, pName: action.payload });
      const page = {
        num: 0,
        users: users.slice(0, 6),
      };
      const newFetchRes = { ...state.fetchRes, users, page };
      return { ...state, fetchRes: newFetchRes, page };
    },
    changePage: (state, action: PayloadAction<number>) => {
      if (state.totalPages < action.payload) {
        state.error = "The page couldn't be found";
      } else {
        state.page.num = action.payload;
        const endIdx = action.payload * 6;
        const startIdx = endIdx - 6;
        state.page.users = state.fetchRes.users?.slice(startIdx, endIdx) ?? [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const pageUsers: IUser[] = action.payload.users?.slice(0, 6) ?? [];
        const page: IPage = {
          num: 1,
          users: pageUsers,
        };
        const totalPages = (action.payload.users?.length ?? 6) / 6;
        return {
          ...state,
          page,
          totalPages,
          fetchStatus: "idle",
          fetchRes: action.payload,
        };
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error;
      });
  },
});

export const { search, changePage } = usersSlice.actions;
export const selectUsers = (state: RootState): IUsersState => state.users;

export default usersSlice.reducer;
