import { useState } from "react";
import { Plus } from "lucide-react";
import TodoList from "./TodoList";

export default function TodoSection() {
  const [listIds, setListIds] = useState<number[]>([1, 2]);

  const addNewList = () => {
    setListIds((prev) => [...prev, Date.now()]);
  };

  const deleteList = (id: number) => {
    setListIds((prev) => prev.filter((listId) => listId !== id));
  };

  return (
    <div className="flex items-start gap-4 p-4 overflow-x-auto">
      {listIds.map((id) => (
        <div key={id} className="flex-shrink-0">
          <TodoList onDelete={() => deleteList(id)} />
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
