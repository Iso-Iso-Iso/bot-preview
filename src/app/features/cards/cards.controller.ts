import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { groupBy } from "lodash";
import { CardsDto } from "./dto/cards.dto";

@Controller("/api/v1/cards")
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    async getCards() {
        const cards = await this.cardsService.getCards();

        return groupBy(cards, (item) => item.currency);
    }

    @Put("/:id")
    async updateCard(@Param("id", ParseIntPipe) id: number, @Body() body: CardsDto) {
        const res = await this.cardsService.updateById(id, body);

        return { data: res };
    }
}
