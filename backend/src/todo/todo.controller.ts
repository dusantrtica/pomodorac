import { Controller, Get, Post } from '@nestjs/common';
import { TodoListSchema, TodoSchema } from './api_schemas';

@Controller('todo')
export class TodoController {
    @Get()
    getTodos(): typeof TodoListSchema {
        return {
            todos: [],
            title: 'Todo List',
        };
    }

    @Post()
    createTodo(@Body() todo: TodoSchema): TodoSchema {
        return todo;
    }
}
