import { BaseModel } from "./base.model";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { DataTypes } from "sequelize";

export const BALANCES_MODEL_NAME = "balances";

@Table({
    modelName: BALANCES_MODEL_NAME,
})
export class BalancesModel extends BaseModel {
    @ForeignKey(() => UsersModel)
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;

    @Column({ type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false })
    hold: number;

    @Column({ type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false })
    active: number;

    @Column({ type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false })
    withdrawing: number;
}
