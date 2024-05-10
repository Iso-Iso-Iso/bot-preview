import { Module } from "@nestjs/common";
import { WithdrawSelectScene } from "./scenes/withdrawSelect.scene";
import { WithdrawAmountScene } from "./scenes/withdrawAmount.scene";
import { WithdrawToScene } from "./scenes/withdrawTo.scene";
import { WithdrawsModule } from "../../withdraws/withdraws.module";
import { UsersModule } from "../../users/users.module";
import { BalancesModule } from "../../balances/balances.module";

@Module({
    imports: [WithdrawsModule, UsersModule, BalancesModule],
    providers: [WithdrawSelectScene, WithdrawAmountScene, WithdrawToScene],
})
export class BotWithdrawModule {}
