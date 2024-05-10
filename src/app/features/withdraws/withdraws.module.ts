import { Module } from "@nestjs/common";
import { WithdrawsController } from "./withdraws.controller";
import { WithdrawsService } from "./withdraws.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { WithdrawsModel } from "../../core/models/withdraws.model";
import { BalancesModel } from "../../core/models/balances.model";

@Module({
    imports: [SequelizeModule.forFeature([WithdrawsModel, BalancesModel])],
    controllers: [WithdrawsController],
    providers: [WithdrawsService],
    exports: [WithdrawsService],
})
export class WithdrawsModule {}
