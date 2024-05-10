import { Module } from "@nestjs/common";
import { BotProfileScene } from "./botProfile.scene";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [UsersModule],
    providers: [BotProfileScene],
})
export class BotProfileModule {}
