import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { random as _random } from "lodash";
import { CanPlayGuard } from "./guards/canPlay.guard";
import { DiceGamePipe } from "./pipes/diceGame.pipe";

@Controller("/api/v1/dice")
@UseGuards(CanPlayGuard)
export class DiceController {
    @Post()
    onGame(@Body() body: DiceGamePipe) {
        return {
            data: {
                gameResult: _random(1, 6),
                balance: 1000,
            },
        };
    }
}
