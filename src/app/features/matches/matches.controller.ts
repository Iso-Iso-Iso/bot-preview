import { Controller, Get, NotFoundException, ParseIntPipe, Query } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { PaginationHelper } from "../../shared/helpers/pagination.helper";

@Controller("/api/v1/matches")
export class MatchesController {
    constructor(private readonly matchesService: MatchesService) {}

    @Get()
    async getMatches(@Query("userId", ParseIntPipe) userId: number, @Query("page", ParseIntPipe) page: number) {
        const count = await this.matchesService.getCountOfUserMatches(userId);

        const meta = PaginationHelper.getPaginationMeta(count);

        if (page > meta.totalPages || page < 1) {
            throw new NotFoundException();
        }

        const matches = await this.matchesService.getMatchesByUserId(userId, page, meta.perPage);

        return { list: matches, meta };
    }
}
