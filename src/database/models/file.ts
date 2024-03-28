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
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  qtdSuccess!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  qtdError!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}

export default File;