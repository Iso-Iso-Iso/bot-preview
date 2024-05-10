import { Module } from "@nestjs/common";
import { BotGamesScene } from "./botGames.scene";

@Module({ providers: [BotGamesScene] })
export class BotGamesModule {}
