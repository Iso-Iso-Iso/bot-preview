import { BaseModel } from "./base.model";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { DataTypes } from "sequelize";
import { DepositStatus } from "../../shared/enums/depositTypes.enum";

export const DEPOSITS_MODEL_NAME = "deposits";

@Table({
    tableName: DEPOSITS_MODEL_NAME,
})
export class DepositsModel extends BaseModel {
    @Column(DataTypes.STRING(16))
    cardNumber: string;

    @Column(DataTypes.INTEGER.UNSIGNED)
    value: number;

    @Column({
        type: DataTypes.ENUM,
        values: Object.values(DepositStatus),
        defaultValue: DepositStatus.PENDING,
    })
    status: DepositStatus;

    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;
}
