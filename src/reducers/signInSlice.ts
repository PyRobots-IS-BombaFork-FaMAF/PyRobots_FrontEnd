import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
const initialState: any = {
  value: "",
};
export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setToken: (
      state: { token : string },
      action: PayloadAction<string>
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { setToken } = signInSlice.actions;

export const selectSignIn = (state: RootState) => state.signIn;
export default signInSlice.reducer;
