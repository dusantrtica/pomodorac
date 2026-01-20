import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateTodoListPayload, TodoList } from "./todo";
import { loadTodosFromLocalStorage } from "../../app/persistence";
import { v4 as uuidv4 } from 'uuid';

const todoSlice = createSlice({
    name: 'todos',
    initialState: () => ({
        todoLists: loadTodosFromLocalStorage(),
    }),
    reducers: {
        addTodoList: (state, action: PayloadAction<CreateTodoListPayload>) => {
            const id = `new_${uuidv4()}`;
            state.todoLists.push({ id, title: action.payload.title, todos: [] });
        },
        deleteTodoList: (state, action: PayloadAction<string>) => {
            state.todoLists = state.todoLists.filter((list: TodoList) => list.id !== action.payload);
        },
        updateTodoList: (state, action: PayloadAction<TodoList>) => {
            state.todoLists = state.todoLists.map((list: TodoList) => list.id === action.payload.id ? action.payload : list);
        },
    },    
});

export const { addTodoList, deleteTodoList, updateTodoList } = todoSlice.actions;
export default todoSlice.reducer;
