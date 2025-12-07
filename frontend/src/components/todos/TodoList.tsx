import type { InitialState } from "../../features/todos/todoSlice";
import Todo from "./Todo";

const TodoList = ({ todos }: InitialState) => {
    return <div className="flex flex-col gap-2">
        
        {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </div>;
}

export default TodoList;