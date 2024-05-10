import { IsNumber } from "class-validator";

export class DiceGamePipe {
    @IsNumber()
    telegramId: number;

    @IsNumber()
    bid: number;
}
