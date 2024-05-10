import { BaseModel } from "./base.model";
import { Column, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

export const COMPLAIN_REPORTS_MODEL_NAME = "complain_reports";

@Table({
    modelName: COMPLAIN_REPORTS_MODEL_NAME,
})
export class ComplainReportsModel extends BaseModel {
    @Column(DataTypes.INTEGER.UNSIGNED)
    telegramId: number;

    @Column(DataTypes.TEXT)
    message: string;

    @Column(DataTypes.STRING(255))
    userName: string;
}
