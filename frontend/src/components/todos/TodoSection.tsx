import { Plus } from "lucide-react";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addTodoList, deleteTodoList, updateTodoList } from "../../features/todos/todoSlice";
import type { CreateTodoListPayload, TodoList as TodoListType } from "../../features/todos/todo";

export default function TodoSection() {
    const todoLists = useSelector((state: RootState) => state.todos.todoLists);
    const dispatch = useDispatch();
    const addNewList = () => {
        dispatch(addTodoList({ title: "New List" } as CreateTodoListPayload));
    };

    const deleteList = (id: string) => {
        dispatch(deleteTodoList(id));
    };

    const updateList = (list: TodoListType) => {
        dispatch(updateTodoList(list));
    };

    return (
        <div className="flex items-start gap-4 p-4 overflow-x-auto">
            {todoLists.map((list: TodoListType) => (
                <div key={list.id} className="flex-shrink-0">
                    <TodoList onDelete={() => deleteList(list.id)} todoList={list} onUpdate={updateList}/>
                </div>
            ))}
            <button
                onClick={addNewList}
                className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                aria-label="Add new todo list"
            >
                <Plus className="w-8 h-8 text-gray-400" />
            </button>
        </div>
    );
}
