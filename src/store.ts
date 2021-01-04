import { configureStore } from '@reduxjs/toolkit';
import todolistReducer, { TodolistState } from './todo/todolist.slice';

export interface GlobalState {
  todolist: TodolistState;
}

export default configureStore({
  reducer: {
    todolist: todolistReducer,
  },
});
