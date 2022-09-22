import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moduloReducer from './slices/modulo-slice'

export const store = configureStore({
  reducer: {
    modulo: moduloReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
