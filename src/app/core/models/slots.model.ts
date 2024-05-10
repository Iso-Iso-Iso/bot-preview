import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { BaseModel } from "./base.model";
import { DataTypes } from "sequelize";
import { SlotVariants } from "../../features/games/slotMachine/enums/slotVariants.enum";

@Table({ modelName: "slots" })
export class SlotsModel extends BaseModel {
    @Column({
        type: DataTypes.ENUM,
        values: Object.values(SlotVariants),
    })
    strategy: SlotVariants;

    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;
}
