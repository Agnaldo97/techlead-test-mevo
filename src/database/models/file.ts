import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "file",
  modelName: "File"
})

class File extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })

  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  total!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  success!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fraud!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  error!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}

export default File;