import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../shared/interfaces/user.interface";
import { InjectModel } from "@nestjs/sequelize";
import { UsersModel } from "../../core/models/users.model";
import { MatchesModel } from "../../core/models/matches.model";
import { WithdrawsModel } from "../../core/models/withdraws.model";
import { DepositsModel } from "../../core/models/deposits.model";
import { BalancesModel } from "../../core/models/balances.model";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UsersModel) private readonly usersModel: typeof UsersModel,
        @InjectModel(BalancesModel) private readonly balanceModel: typeof BalancesModel,
        private readonly sequelize: Sequelize,
    ) {}

    public async getUsers(currentPage: number, perPage: number) {
        return this.usersModel.findAll({
            limit: perPage,
            offset: (currentPage - 1) * perPage,
        });
    }

    public async getUsersCount() {
        return this.usersModel.count();
    }

    public async getUserById(id: number) {
        return this.usersModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: MatchesModel,
                    limit: 20,
                },
                {
                    model: WithdrawsModel,
                    limit: 20,
                },
                {
                    model: DepositsModel,
                    limit: 20,
                },
            ],
        });
    }
    public async getUserByTelegramId(telegramId: number, { isWithBalance = false } = {}) {
        return this.usersModel.findOne({
            where: {
                telegramId,
            },
            include: [BalancesModel],
        });
    }
    public async createUser(user: Partial<UserEntity>) {
        await this.sequelize.transaction(async (t) => {
            const userEntity = await this.usersModel.create({ ...user }, { transaction: t });

            await this.balanceModel.create(
                {
                    hold: 0,
                    active: 0,
                    withdrawing: 0,
                    userId: userEntity.id,
                },
                {
                    transaction: t,
                },
            );
        });
    }

    public async updateUser(user: Partial<UserEntity>) {
        return this.usersModel.update(user, {
            where: { telegramId: user.telegramId },
        });
    }
}
