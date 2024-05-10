import { Module } from "@nestjs/common";
import { InvoicesController } from "./invoices.controller";
import { InvoicesService } from "./invoices.service";
import { CryptoPaymentApiModule } from "../cryptoPaymentApi/cryptoPaymentApi.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { InvoicesModel } from "../../core/models/invoices.model";
import { InvoicesEvents } from "./invoices.events";
import { BalancesModule } from "../balances/balances.module";

@Module({
    imports: [CryptoPaymentApiModule, SequelizeModule.forFeature([InvoicesModel]), BalancesModule],
    controllers: [InvoicesController],
    providers: [InvoicesService, InvoicesEvents],
    exports: [InvoicesService],
})
export class InvoicesModule {}
