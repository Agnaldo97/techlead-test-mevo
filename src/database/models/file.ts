import { Table, Column, DataType, Model} from 'sequelize-typescript';

@Table({
   timestamps: true ,
   tableName: "files",
   modelName: "Files"
})

export class File extends Model {

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