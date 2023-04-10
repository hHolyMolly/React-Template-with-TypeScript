import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Template {
  value: number;
}

const initialState: Template = {
  value: 0,
};

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setTemplate } = templateSlice.actions;

export default templateSlice.reducer;
