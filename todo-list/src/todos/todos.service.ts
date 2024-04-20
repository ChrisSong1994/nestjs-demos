import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTodoDto, UpdateTodoDto } from "./dto/todo.dto";
import { Todo } from "./models/todo.module";

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo
  ) {}

  // 新增
  create(createUserDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({
      title: createUserDto.title,
      status: createUserDto.status,
    });
  }

  // 列表
  findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  // 详情
  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  // 删除
  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }

  // 更新
  async update(id: string, uodateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todoModel.update(uodateTodoDto, { where: { id } });
  }
}
