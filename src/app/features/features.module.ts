import { Module } from "@nestjs/common";
import { SettingsModule } from "./settings/settings.module";
import { WithdrawsModule } from "./withdraws/withdraws.module";
import { CardsModule } from "./cards/cards.module";
import { UsersModule } from "./users/users.module";
import { BotStartupModule } from "./bot/botStartup/botStartup.module";
import { BotMainScreenModule } from "./bot/botMainScreen/botMainScreen.module";
import { BotGamesModule } from "./bot/botGames/botGames.module";
import { BotProfileModule } from "./bot/botProfile/botProfile.module";
import { BotDepositModule } from "./bot/botDeposit/botDeposit.module";
import { MatchesModule } from "./matches/matches.module";
import { DepositsModule } from "./deposits/deposits.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { BotAgreementModule } from "./bot/botAgreement/botAgreement.module";
import { BotWithdrawModule } from "./bot/botWithdraw/botWithdraw.module";
import { SlotMachineModule } from "./games/slotMachine/slotMachine.module";
import { CoinModule } from "./games/coin/coin.module";
import { DiceModule } from "./games/dice/dice.module";

@Module({
    imports: [
        UsersModule,
        SettingsModule,
        WithdrawsModule,
        CardsModule,
        BotMainScreenModule,
        BotStartupModule,
        BotGamesModule,
        BotProfileModule,
        BotDepositModule,
        MatchesModule,
        DepositsModule,
        InvoicesModule,
        BotAgreementModule,
        BotWithdrawModule,
        SlotMachineModule,
        CoinModule,
        DiceModule,
    ],
})
export class FeaturesModule {}
