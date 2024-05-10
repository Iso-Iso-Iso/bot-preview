import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";

export const CHANEL_VALIDATION_SCENE = "CHANEL_VALIDATION_SCENE";

const ACTIONS = {
    READY: "ready",
};

@Scene(CHANEL_VALIDATION_SCENE)
export class ChanelValidationScene {
    @SceneEnter()
    async enter(@Ctx() ctx: SceneContext) {
        await ctx.reply("Ссылка на телеграмм канал", {
            reply_markup: {
                inline_keyboard: [[{ text: "Готово ✅", callback_data: ACTIONS.READY }]],
            },
        });
    }

    @Action(ACTIONS.READY)
    async onReady(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
