export type Todo = {
    id: string;
    title: string;
    isCompleted: boolean;
}

export type TodoList = {
    id: string;
    title: string;
    todos: Todo[];
}

export type CreateTodoListPayload = {
    title: string;
}