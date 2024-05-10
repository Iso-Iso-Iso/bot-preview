import { BaseModel } from "./base.model";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { DataTypes } from "sequelize";
import { InvoiceStatus } from "../../shared/enums/invoiceStatus.enum";

@Table({
    modelName: "invoices",
})
export class InvoicesModel extends BaseModel {
    @Column(DataTypes.INTEGER.UNSIGNED)
    amount: number;

    @Column({
        unique: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    invoiceApiId: number;

    @Column(DataTypes.INTEGER.UNSIGNED)
    chatApiId: number;

    @Column({
        type: DataTypes.ENUM,
        values: Object.values(InvoiceStatus),
        defaultValue: InvoiceStatus.WAITING,
    })
    status: InvoiceStatus;

    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;
}
