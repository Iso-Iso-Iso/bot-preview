import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CardsModel } from "../../core/models/cards.model";
import { BankCards } from "../../shared/enums/bankCards.enum";

@Injectable()
export class CardsService {
    constructor(@InjectModel(CardsModel) private readonly cardsModel: typeof CardsModel) {}

    public async getCards() {
        return this.cardsModel.findAll({
            raw: true,
        });
    }

    public async getCardByBank(bank: BankCards) {
        return this.cardsModel.findOne({
            where: {
                name: bank,
            },
        });
    }

    public async updateById(id: number, update) {
        const card = await this.cardsModel.findOne({
            where: { id },
        });

        card.value = update.value;

        return card.save();
    }
}
