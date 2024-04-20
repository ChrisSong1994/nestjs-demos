import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
} from "@nestjs/common";
import { CreateTodoDto, UpdateTodoDto } from "./dto/todo.dto";
import { ResponseDTO } from "../shared/dto/response.dto";
import { Todo } from "./models/todo.module";
import { TodosService } from "./todos.service";

@Controller("todo")
export class TodosController {
  constructor(private readonly TodosService: TodosService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateTodoDto
  ): Promise<ResponseDTO<Todo>> {
    try {
      const todo = await this.TodosService.create(createUserDto);
      return new ResponseDTO(HttpStatus.OK, "todo created successfully", todo);
    } catch (error) {
      return new ResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null
      );
    }
  }

  @Post(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ): Promise<ResponseDTO<Todo>> {
    try {
      await this.TodosService.update(id, updateTodoDto);
      const updatedTodo = await this.TodosService.findOne(id);

      return new ResponseDTO(
        HttpStatus.OK,
        "todo updated successfully",
        updatedTodo
      );
    } catch (error) {
      return new ResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null
      );
    }
  }

  @Get()
  async findAll(): Promise<ResponseDTO<Todo[]>> {
    try {
      const todolist = await this.TodosService.findAll();
      return new ResponseDTO(HttpStatus.OK, "success", todolist);
    } catch (error) {
      return new ResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null
      );
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseDTO<Todo>> {
    try {
      const todo = await this.TodosService.findOne(id);
      return new ResponseDTO(HttpStatus.OK, "success", todo);
    } catch (error) {
      return new ResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null
      );
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<ResponseDTO<null>> {
    try {
      await this.TodosService.remove(id);
      return new ResponseDTO(HttpStatus.OK, "success", null);
    } catch (error) {
      return new ResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
        null
      );
    }
  }
}
