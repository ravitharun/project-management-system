import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [] as any[],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Add: (state, action: PayloadAction<any[]>) => {
    

      state.value = action.payload;

    },

    remove: (state) => {
      state.value = [];
    },
  },
});

export const { Add, remove } = counterSlice.actions;
export default counterSlice.reducer;