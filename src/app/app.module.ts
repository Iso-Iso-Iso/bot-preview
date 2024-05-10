import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { FeaturesModule } from "./features/features.module";

@Module({
    imports: [CoreModule, SharedModule, FeaturesModule],
    controllers: [AppController],
})
export class AppModule {}
