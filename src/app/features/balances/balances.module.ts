import { Module } from "@nestjs/common";
import { BalancesService } from "./balances.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModel } from "../../core/models/users.model";
import { BalancesModel } from "../../core/models/balances.model";

@Module({
    imports: [SequelizeModule.forFeature([UsersModel, BalancesModel])],
    providers: [BalancesService],
    exports: [BalancesService],
})
export class BalancesModule {}
