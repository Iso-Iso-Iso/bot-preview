import { Controller, Get, Patch, Query } from "@nestjs/common";

@Controller("/api/v1/settings")
export class SettingsController {
    @Get()
    getSettings() {}

    @Patch()
    updateSettings(@Query("name") settingName: string) {
        return { settingName };
    }
}
