import { Module } from "@nestjs/common";
import { BotAgreementScene } from "./botAgreement.scene";

@Module({
    providers: [BotAgreementScene],
})
export class BotAgreementModule {}
