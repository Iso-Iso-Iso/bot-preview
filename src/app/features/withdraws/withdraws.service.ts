import { Injectable } from "@nestjs/common";
import { WithdrawsModel } from "../../core/models/withdraws.model";
import { InjectModel } from "@nestjs/sequelize";
import { BalancesModel } from "../../core/models/balances.model";
import { UsersModel } from "../../core/models/users.model";
import { Sequelize } from "sequelize-typescript";
import { WithdrawStatusEnum } from "../../shared/enums/withdrawStatus.enum";

@Injectable()
export class WithdrawsService {
    constructor(
        @InjectModel(WithdrawsModel) private readonly withdrawsModel: typeof WithdrawsModel,
        @InjectModel(BalancesModel) private readonly balancesModel: typeof BalancesModel,
        private readonly sequelize: Sequelize,
    ) {}

    public async createWithdraw({ isCrypto, to, network, value, userId, transaction }) {
        return this.withdrawsModel.create({ isCrypto, to, network, value, userId }, { transaction });
    }

    public async getWithdrawsCount() {
        return this.withdrawsModel.count();
    }

    public async getWithdrawById(id: number) {
        return this.withdrawsModel.findOne({
            where: { id },
            include: [
                UsersModel,
                {
                    model: UsersModel,
                    include: [BalancesModel],
                },
            ],
        });
    }

    public async getWithdraws(page: number, perPage: number) {
        return this.withdrawsModel.findAll({
            limit: perPage,
            offset: (page - 1) * perPage,
        });
    }

    public async approveWithdraw(withdrawId: number) {
        const withdraw = await this.getWithdrawById(withdrawId);

        await this.sequelize.transaction(async (transaction) => {
            const { value: withdrawValue, user } = withdraw;

            user.balance.withdrawing -= withdrawValue;
            withdraw.status = WithdrawStatusEnum.READY;

            await user.balance.save({ transaction });
            await withdraw.save({ transaction });
        });
    }

    public async declineWithdraw(withdrawId: number) {
        const withdraw = await this.getWithdrawById(withdrawId);

        await this.sequelize.transaction(async (transaction) => {
            const { value: withdrawValue, user } = withdraw;

            user.balance.withdrawing -= withdrawValue;
            user.balance.active += withdrawValue;
            withdraw.status = WithdrawStatusEnum.DENY;

            await user.balance.save({ transaction });
            await withdraw.save({ transaction });
        });
    }
}
