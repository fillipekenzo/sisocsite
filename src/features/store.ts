import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import menuReducer from './slices/menu-slice'
import sidebarReducer from './slices/sidebar-slice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    sidebar: sidebarReducer
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
