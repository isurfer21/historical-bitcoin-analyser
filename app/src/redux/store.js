import { configureStore } from '@reduxjs/toolkit';
import reportReducer from './slices/report-slice';

export const store = configureStore({
  reducer: {
    report: reportReducer
  },
});
