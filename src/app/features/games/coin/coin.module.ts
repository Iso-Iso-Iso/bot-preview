import { Module } from "@nestjs/common";
import { CoinController } from "./coin.controller";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [CoinController],
})
export class CoinModule {}
