// REDUX
import { createSlice, Dispatch, SliceCaseReducers } from '@reduxjs/toolkit';
import { GlobalState } from '../store';

export interface TodolistState {
  todos: Todo[];
}

export interface Todo {
  name: string;
  completed: boolean;
}

const mock: Todo = {
  name: 'todo 1',
  completed: false,
};

export const todolistSlice = createSlice<
  TodolistState,
  SliceCaseReducers<TodolistState>
>({
  name: 'todolist',
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, { payload: todos }) => {
      state.todos = todos;
    },
    addTodo: (state, { payload: name }: { payload: string }) => {
      state.todos.push({
        completed: false,
        name,
      });
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    toggleTodo: (state, { payload: index }) => {
      const todo = state.todos[index];
      todo.completed = !todo.completed;
    },
  },
});

export const {
  addTodo,
  clearCompletedTodos,
  toggleTodo,
  setTodos,
} = todolistSlice.actions;

export const loadTodos = (state: TodolistState) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(setTodos([mock]));
  }, 2000);
};

export const selectTodos = ({ todolist }: GlobalState) => todolist.todos;
export const selectUncompletedTodosCount = ({ todolist }: GlobalState) =>
  todolist.todos.filter((todo) => !todo.completed).length;

export default todolistSlice.reducer;
