import { Module } from "@nestjs/common";
import { MatchesController } from "./matches.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MatchesModel } from "../../core/models/matches.model";
import { MatchesService } from "./matches.service";

@Module({
    imports: [SequelizeModule.forFeature([MatchesModel])],
    controllers: [MatchesController],
    providers: [MatchesService],
})
export class MatchesModule {}
