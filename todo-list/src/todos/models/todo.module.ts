import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column
  title: string;

  @Column
  status: 1 | 0;

  @Column({ defaultValue: true })
  isActive: boolean;
}
