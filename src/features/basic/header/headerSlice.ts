import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";

type TSearchHandler = (word: string) => void;
export interface IHeaderState {
  searchHandler: TSearchHandler;
}

const initialState: IHeaderState = {
  searchHandler: (word) => {
    console.log(word);
  },
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setSearchHandler: (state, action: PayloadAction<TSearchHandler>) => {
      return { ...state, searchHandler: action.payload };
    },
  },
});

export const { setSearchHandler } = headerSlice.actions;
export const selectHeader = (state: RootState): IHeaderState => state.header;

export default headerSlice.reducer;
