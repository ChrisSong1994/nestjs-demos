import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Todo extends Model {
  @Column
  title: string;

  @Column({ defaultValue: 0 })
  status: 1 | 0;
}
