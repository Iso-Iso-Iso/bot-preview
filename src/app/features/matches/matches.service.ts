import { Injectable } from "@nestjs/common";
import { MatchesModel } from "../../core/models/matches.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class MatchesService {
    constructor(@InjectModel(MatchesModel) private readonly matchesModel: typeof MatchesModel) {}

    async getCountOfUserMatches(userId: number) {
        return this.matchesModel.count({ where: { userId } });
    }

    async getMatchesByUserId(userId: number, page: number, perPage: number) {
        return this.matchesModel.findAll({
            where: {
                userId,
            },
            limit: perPage,
            offset: (page - 1) * perPage,
        });
    }
}
