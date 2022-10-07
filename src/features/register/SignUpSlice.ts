import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SignUpState {
    value: Boolean;
  }
const initialState: SignUpState = {
    value: false,
  };
export const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      valid: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value = !state;
      },

    }
});
export const { valid } = signUpSlice.actions;
export const selectSignUp = (state: RootState) => state.signup.value;
export default signUpSlice.reducer;