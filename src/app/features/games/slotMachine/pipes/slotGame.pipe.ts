import { IsNumber } from "class-validator";

export class SlotGamePipe {
    @IsNumber()
    telegramId: number;

    @IsNumber()
    bid: number;
}
