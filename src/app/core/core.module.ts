import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModel } from "./models/users.model";
import { TelegrafModule } from "nestjs-telegraf";
import { session } from "telegraf";
import { CardsModel } from "./models/cards.model";
import { MatchesModel } from "./models/matches.model";
import { BalancesModel } from "./models/balances.model";
import { WithdrawsModel } from "./models/withdraws.model";
import { DepositsModel } from "./models/deposits.model";
import { InvoicesModel } from "./models/invoices.model";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { SlotsModel } from "./models/slots.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: "mysql",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA_NAME,
            models: [
                UsersModel,
                CardsModel,
                MatchesModel,
                BalancesModel,
                WithdrawsModel,
                DepositsModel,
                InvoicesModel,
                SlotsModel,
            ],
        }),
        TelegrafModule.forRoot({
            token: process.env.BOT_TELEGRAM_TOKEN,
            middlewares: [session()],
        }),
        EventEmitterModule.forRoot(),
    ],
})
export class CoreModule {}
