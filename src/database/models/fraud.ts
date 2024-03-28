import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: "fraud",
  modelName: "Fraud"
})

export class Fraud extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })

  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  line!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createAt!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updateAt!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  file_name!: string;

}