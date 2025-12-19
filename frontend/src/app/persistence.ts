import type { TodoList } from "../features/todos/todo";

export const TODOS_LOCAL_STORAGE_KEY = 'todos';

export const saveTodosToLocalStorage = (todoLists: TodoList[]) => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todoLists));
}

export const loadTodosFromLocalStorage = (): TodoList[] => {
    const todoLists = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    return todoLists ? JSON.parse(todoLists) : [];
}
