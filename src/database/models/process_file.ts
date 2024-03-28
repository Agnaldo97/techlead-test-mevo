import { Table, Column, DataType, Model} from 'sequelize-typescript';

@Table({
   timestamps: true ,
   tableName: "file_process",
   modelName: "FileProcess"
})

export class FileProcess extends Model {

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reason!: string;
  
}