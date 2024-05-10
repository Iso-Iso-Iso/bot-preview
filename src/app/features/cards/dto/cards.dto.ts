import { IsString, IsNotEmpty, IsIn, IsCreditCard } from "class-validator";
import { CardCurrencies } from "../../../shared/enums/cardCurrencies.enum";
export class CardsDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(CardCurrencies))
    currency: string;

    @IsCreditCard()
    @IsNotEmpty()
    value: number;
}
