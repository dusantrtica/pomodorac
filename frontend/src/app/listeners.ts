import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodoList, updateTodoList, deleteTodoList } from "../features/todos/todoSlice";
import type { RootState } from "./store";
import { saveTodosToLocalStorage } from "./persistence";
const todoListener = createListenerMiddleware();

todoListener.startListening({
    matcher: isAnyOf(addTodoList, updateTodoList, deleteTodoList),
    effect: async (action, listenerApi) => {
        saveTodosToLocalStorage((listenerApi.getState() as RootState).todos.todoLists);
    },
});

export default todoListener;