import { BaseModel } from "./base.model";
import { Column, HasMany, HasOne, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { MatchesModel } from "./matches.model";
import { WithdrawsModel } from "./withdraws.model";
import { BalancesModel } from "./balances.model";
import { DepositsModel } from "./deposits.model";
import { InvoicesModel } from "./invoices.model";
import { SlotsModel } from "./slots.model";

const USERS_MODEL_NAME = "users";

@Table({
    modelName: USERS_MODEL_NAME,
})
export class UsersModel extends BaseModel {
    @Column({
        type: DataTypes.BIGINT.UNSIGNED,
    })
    telegramId: number;

    @Column(DataTypes.STRING(255))
    firstName: string;

    @Column(DataTypes.STRING(255))
    lastName: string;

    @Column(DataTypes.STRING(255))
    fullName: string;

    @Column(DataTypes.STRING(255))
    userName: string;

    @Column(DataTypes.BOOLEAN)
    isBot: boolean;

    @Column(DataTypes.STRING(24))
    languageCode: string;

    @HasMany(() => MatchesModel)
    matches: MatchesModel[];

    @HasMany(() => WithdrawsModel)
    withdraws: WithdrawsModel[];

    @HasOne(() => BalancesModel)
    balance: BalancesModel;

    @HasMany(() => DepositsModel)
    deposits: DepositsModel[];

    @HasMany(() => InvoicesModel)
    invoices: InvoicesModel[];

    @HasMany(() => SlotsModel)
    slots: SlotsModel[];
}
