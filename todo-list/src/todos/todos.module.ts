import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
