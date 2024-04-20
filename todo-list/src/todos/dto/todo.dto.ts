export class CreateTodoDto {
  title: string;
  status: 1 | 0; // 1: 已完成 0: 未完成
}

export class UpdateTodoDto {
  title?: string;
  status?: 1 | 0; // 1: 已完成 0: 未完成
}
