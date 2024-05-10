import { Module } from "@nestjs/common";
import { BotMainScreenScene } from "./botMainScreen.scene";

@Module({
    providers: [BotMainScreenScene],
})
export class BotMainScreenModule {}
