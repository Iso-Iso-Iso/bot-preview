import { Module } from "@nestjs/common";
import { DiceController } from "./dice.controller";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [DiceController],
})
export class DiceModule {}
