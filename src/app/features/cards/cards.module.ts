import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { CardsModel } from "../../core/models/cards.model";

@Module({
    imports: [SequelizeModule.forFeature([CardsModel])],
    controllers: [CardsController],
    providers: [CardsService],
    exports: [CardsService],
})
export class CardsModule {}
