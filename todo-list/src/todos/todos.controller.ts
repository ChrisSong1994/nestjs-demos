import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-toto.dto';
import { Todo } from './models/todo.module';
import { TodosService } from './todos.service';

@Controller('todo')
export class TodosController {
  constructor(private readonly TodosService: TodosService) {}

  @Post()
  create(@Body() createUserDto: CreateTodoDto): Promise<Todo> {
    return this.TodosService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.TodosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.TodosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.TodosService.remove(id);
  }
}
