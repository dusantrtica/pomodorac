import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const TodoSchema = z.object({
    id: z.string(),
    title: z.string(),
    isCompleted: z.boolean(),
}).openapi('Todo');

export const TodoListSchema = z.object({
    todos: z.array(TodoSchema),
    title: z.string(),
}).openapi('TodoList')