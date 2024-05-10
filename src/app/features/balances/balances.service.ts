import { Injectable } from "@nestjs/common";
import { BalancesModel } from "../../core/models/balances.model";
import { InjectModel } from "@nestjs/sequelize";
import { UsersModel } from "../../core/models/users.model";
import { Transaction } from "sequelize";

@Injectable()
export class BalancesService {
    constructor(
        @InjectModel(BalancesModel) private readonly balancesModel: typeof BalancesModel,
        @InjectModel(UsersModel) private readonly usersModel: typeof UsersModel,
    ) {}

    public async addHoldToUserBalance({ userId, value }, transaction: Transaction) {
        return this.balancesModel.increment({ hold: value }, { where: { userId }, transaction });
    }

    public async addAmountToActive({ amount, userId }, transaction: Transaction) {
        return this.balancesModel.increment({ active: amount }, { where: { userId }, transaction });
    }

    public async transferFromActiveToWithdrawing({ amount, userId, transaction }) {
        await this.balancesModel.decrement({ active: amount }, { where: { userId }, transaction });
        await this.balancesModel.increment({ withdrawing: amount }, { where: { userId }, transaction });
    }

    public async canUserWithdraw({ amount, userId }) {
        const balance = await this.balancesModel.findOne({ where: { userId } });

        return amount <= balance.active;
    }
}
