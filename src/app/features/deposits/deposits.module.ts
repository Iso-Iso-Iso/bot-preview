import { Module } from "@nestjs/common";
import { DepositsService } from "./deposits.service";
import { DepositsController } from "./deposits.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { DepositsModel } from "../../core/models/deposits.model";

@Module({
    imports: [SequelizeModule.forFeature([DepositsModel])],
    controllers: [DepositsController],
    providers: [DepositsService],
    exports: [DepositsService],
})
export class DepositsModule {}
