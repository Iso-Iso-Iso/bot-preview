import { BaseModel } from "./base.model";
import { Column, Table } from "sequelize-typescript";
import { CardCurrencies } from "../../shared/enums/cardCurrencies.enum";
import { DataTypes } from "sequelize";
import { BankCards } from "../../shared/enums/bankCards.enum";

const CARDS_MODEL_NAME = "cards";

@Table({
    modelName: CARDS_MODEL_NAME,
})
export class CardsModel extends BaseModel {
    @Column({
        type: DataTypes.ENUM,
        values: Object.values(CardCurrencies),
    })
    currency: CardCurrencies;

    @Column({
        type: DataTypes.ENUM,
        values: Object.values(BankCards),
        unique: true,
    })
    name: BankCards;

    @Column(DataTypes.STRING(16))
    value: string;
}
