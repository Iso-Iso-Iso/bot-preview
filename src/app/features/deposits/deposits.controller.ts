import { Controller, Get, NotFoundException, ParseIntPipe, Query } from "@nestjs/common";
import { PaginationHelper } from "../../shared/helpers/pagination.helper";
import { DepositsService } from "./deposits.service";

@Controller("/api/v1/deposits")
export class DepositsController {
    constructor(private readonly depositsService: DepositsService) {}

    @Get()
    async getDeposits(@Query("page", ParseIntPipe) page: number) {
        const usersCount = await this.depositsService.getDepositsCount();
        const meta = PaginationHelper.getPaginationMeta(usersCount);

        if (page > meta.totalPages || page < 1) {
            throw new NotFoundException();
        }

        const deposits = await this.depositsService.getDeposits(page, meta.perPage);

        return { list: deposits, meta };
    }
}
