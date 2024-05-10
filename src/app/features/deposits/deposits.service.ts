import { Injectable } from "@nestjs/common";
import { DepositsModel } from "../../core/models/deposits.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class DepositsService {
    constructor(@InjectModel(DepositsModel) private readonly depositsModel: typeof DepositsModel) {}

    async getDepositsCount() {
        return this.depositsModel.count();
    }

    async getDeposits(currentPage: number, perPage: number) {
        return this.depositsModel.findAll({
            limit: perPage,
            offset: (currentPage - 1) * perPage,
        });
    }

    async createDeposit({ userId, cardNumber, value }) {
        return this.depositsModel.create({ userId, cardNumber, value });
    }
}
