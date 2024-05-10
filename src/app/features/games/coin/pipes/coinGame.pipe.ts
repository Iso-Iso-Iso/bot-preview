import { IsNumber } from "class-validator";

export class CoinGamePipe {
    @IsNumber()
    telegramId: number;

    @IsNumber()
    bid: number;
}
