import { Module } from "@nestjs/common";
import { SelectPaymentMethodScene } from "./scenes/selectPaymentMethod.scene";
import { DepositSelectScene } from "./scenes/depositSelect.scene";
import { CardsModule } from "../../cards/cards.module";
import { DepositScene } from "./scenes/deposit.scene";
import { DepositsModule } from "../../deposits/deposits.module";
import { UsersModule } from "../../users/users.module";
import { CryptoDepositScene } from "./scenes/cryptoDeposit.scene";
import { CryptoPaymentApiModule } from "../../cryptoPaymentApi/cryptoPaymentApi.module";
import { InvoicesModule } from "../../invoices/invoices.module";
import { BalancesModule } from "../../balances/balances.module";

@Module({
    imports: [CardsModule, DepositsModule, UsersModule, CryptoPaymentApiModule, InvoicesModule, BalancesModule],
    providers: [SelectPaymentMethodScene, DepositSelectScene, DepositScene, CryptoDepositScene],
})
export class BotDepositModule {}
