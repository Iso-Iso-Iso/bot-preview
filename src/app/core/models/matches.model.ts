import { BaseModel } from "./base.model";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { MatchesType } from "../../shared/enums/matchesTypes.enum";
import { DataTypes } from "sequelize";

export const MATCHES_MODEL_NAME = "matches";

@Table({
    modelName: MATCHES_MODEL_NAME,
})
export class MatchesModel extends BaseModel {
    @Column({
        type: DataTypes.ENUM,
        values: Object.values(MatchesType),
    })
    type: MatchesType;

    @Column(DataTypes.INTEGER)
    result: number;

    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @BelongsTo(() => UsersModel)
    user: UsersModel;
}
