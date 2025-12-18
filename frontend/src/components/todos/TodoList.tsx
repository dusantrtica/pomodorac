import { useState } from "react";
import { Button, Disclosure } from "@headlessui/react";
import { ChevronDown, Trash2, X } from "lucide-react";

interface TodoListProps {
  onDelete?: () => void;
}

export default function TodoList({ onDelete }: TodoListProps) {
  const [title, setTitle] = useState("My Todo List");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Finish React assignment", completed: true },
    { id: 3, title: "Go to the gym", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      },
    ]);

    setNewTodo("");
  };

  return (
    <div className="w-80">
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex w-full items-center justify-between px-4 py-3">
              <Disclosure.Button className="flex flex-1 items-center justify-between text-left text-lg font-semibold">
                {isEditingTitle ? (
                  <input
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsEditingTitle(false);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                  />
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingTitle(true);
                    }}
                  >
                    {title}
                  </span>
                )}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="ml-2 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Delete list"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="px-4 pb-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  placeholder="Add a new todo"
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Button
                  onClick={addTodo}
                  className="rounded-xl bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Add
                </Button>
              </div>
            </div>

            <Disclosure.Panel className="border-t border-gray-200 px-4 py-3">
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
                    />
                    <span
                      className={`flex-1 text-sm transition-colors ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                      title="Delete todo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
