import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./todo";

export type InitialState = {
    todos: Todo[];
}

const initialState: InitialState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload);
        },
    },
}); 

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;