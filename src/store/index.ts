import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './todosSlice';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    todos: todosSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
