import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { BotStartupService } from "./botStartup.service";
import { CHANEL_VALIDATION_SCENE } from "./scenes/chanelValidation.scene";
import { BotStartupHelper } from "./botStartup.helper";
import { UserHelper } from "../../../shared/helpers/user.helper";
import { UsersService } from "../../users/users.service";

@Update()
export class BotStartupUpdate {
    constructor(private readonly botStartupService: BotStartupService) {}

    @Start()
    async onStart(@Ctx() ctx: any) {
        console.log(ctx.from);
        const userEntity = UserHelper.fromMessageToUserEntity(ctx.message.from);

        await this.botStartupService.upsertUser(userEntity);

        const greetingMessage = BotStartupHelper.getGreetingMessage(userEntity);

        await ctx.sendMessage(greetingMessage);
        await ctx.scene.enter(CHANEL_VALIDATION_SCENE);
    }
}
