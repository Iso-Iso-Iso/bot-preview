import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { UsersService } from "../../users/users.service";
import { MAIN_SCREEN_SCENE } from "../botMainScreen/botMainScreen.scene";

export const PROFILE_SCENE = "PROFILE_SCENE";

const ACTIONS = {
    BACK: "back",
};

@Scene(PROFILE_SCENE)
export class BotProfileScene {
    constructor(private readonly usersService: UsersService) {}

    @SceneEnter()
    async enter(@Ctx() context: SceneContext) {
        const user = await this.usersService.getUserByTelegramId(context.from.id);

        const text = `Профиль 👤` + "\n\n" + `Активный баланс: ${user.balance.active}`;

        await context.reply(text, {
            reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: ACTIONS.BACK }]],
            },
        });
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
