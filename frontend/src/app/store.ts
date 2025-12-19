import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/pomodoro-session/sessionSlice';
import todoReducer from '../features/todos/todoSlice';
import todoListener from './listeners';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(todoListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;