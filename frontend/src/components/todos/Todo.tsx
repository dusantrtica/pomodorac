import { Button } from "@headlessui/react";

const Todo = () => {
    return <div className="flex flex-col gap-2 p-4 bg-white/10 rounded-lg">
        <input type="text" />
        <Button>Add</Button>
    </div>;
}

export default Todo;