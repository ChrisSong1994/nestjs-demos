import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-toto.dto';
import { Todo } from './models/todo.module';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  create(createUserDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({
      title: createUserDto.title,
      status: createUserDto.status,
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
