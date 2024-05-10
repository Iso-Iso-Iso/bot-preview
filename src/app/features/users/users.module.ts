import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModel } from "../../core/models/users.model";
import { BalancesModel } from "../../core/models/balances.model";

@Module({
    imports: [SequelizeModule.forFeature([UsersModel, BalancesModel])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
