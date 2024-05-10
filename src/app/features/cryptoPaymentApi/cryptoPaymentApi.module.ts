import { Module } from "@nestjs/common";
import { InvoicesApiService } from "./services/invoicesApi.service";
import { HttpModule } from "@nestjs/axios";
import * as process from "process";

@Module({
    imports: [
        HttpModule.register({
            baseURL: process.env.CRYPTO_API_HOST,
            headers: {
                "Crypto-Pay-API-Token": process.env.CRYPTO_API_TOKEN,
            },
        }),
    ],
    providers: [InvoicesApiService],
    exports: [InvoicesApiService],
})
export class CryptoPaymentApiModule {}
