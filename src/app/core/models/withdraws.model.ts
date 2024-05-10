import { BaseModel } from "./base.model";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { WithdrawStatusEnum } from "../../shared/enums/withdrawStatus.enum";
import { UsersModel } from "./users.model";

export const WITHDRAWS_MODEL_NAME = "withdraws";

@Table({
    modelName: WITHDRAWS_MODEL_NAME,
})
export class WithdrawsModel extends BaseModel {
    @Column(DataTypes.BOOLEAN)
    isCrypto: boolean;

    @Column(DataTypes.STRING(255))
    to: string;

    @Column(DataTypes.STRING(255))
    network: string;

    @Column(DataTypes.INTEGER.UNSIGNED)
    value: number;

    @Column({
        type: DataTypes.ENUM,
        values: Object.values(WithdrawStatusEnum),
        defaultValue: WithdrawStatusEnum.PENDING,
    })
    status: WithdrawStatusEnum;

    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;
}
