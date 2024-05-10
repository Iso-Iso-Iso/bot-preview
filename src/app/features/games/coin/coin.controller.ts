import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { random } from "lodash";
import { CoinGamePipe } from "./pipes/coinGame.pipe";
import { CanPlayGuard } from "./guards/canPlay.guard";

@Controller("/api/v1/coin")
@UseGuards(CanPlayGuard)
export class CoinController {
    @Post()
    onGame(@Body() body: CoinGamePipe) {
        console.log(body);
        return { data: { gameResult: random(0, 10) < 4, balance: 1000 } };
    }
}
