import { Module } from "@nestjs/common";
import { BotStartupUpdate } from "./botStartup.update";
import { BotStartupService } from "./botStartup.service";
import { ChanelValidationScene } from "./scenes/chanelValidation.scene";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [UsersModule],
    providers: [BotStartupUpdate, BotStartupService, ChanelValidationScene],
})
export class BotStartupModule {}
