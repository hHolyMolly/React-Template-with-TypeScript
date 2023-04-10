import { configureStore } from '@reduxjs/toolkit';

import template from './slices/template';

export const store = configureStore({
  reducer: {
    template,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
