import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'todo',
      autoLoadModels: true,
      synchronize: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
