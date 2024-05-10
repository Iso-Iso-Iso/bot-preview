import { Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Query } from "@nestjs/common";
import { WithdrawsService } from "./withdraws.service";
import { PaginationHelper } from "../../shared/helpers/pagination.helper";

@Controller("/api/v1/withdraws")
export class WithdrawsController {
    constructor(private readonly withdrawsServices: WithdrawsService) {}

    @Get()
    async getWithdraws(@Query("page", ParseIntPipe) page: number) {
        const count = await this.withdrawsServices.getWithdrawsCount();

        const meta = PaginationHelper.getPaginationMeta(count);

        if (page > meta.totalPages || page < 1) {
            throw new NotFoundException();
        }

        const withdraws = await this.withdrawsServices.getWithdraws(page, meta.perPage);

        return { meta, list: withdraws };
    }

    @Patch("/:id/approve")
    async approveWithdraw(@Param("id", ParseIntPipe) withdrawId: number) {
        await this.withdrawsServices.approveWithdraw(withdrawId);
    }

    @Patch("/:id/decline")
    async declineWithdraw(@Param("id", ParseIntPipe) withdrawId: number) {
        await this.withdrawsServices.declineWithdraw(withdrawId);
    }
}
