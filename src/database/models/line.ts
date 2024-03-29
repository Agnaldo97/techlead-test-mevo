import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: "line",
    modelName: "Line"
})

class Line extends Model {

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
    id_file!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    reason?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status!: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    line!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    from!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    to!: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    amount!: number;

}

export default Line;