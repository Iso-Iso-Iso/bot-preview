import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { MAIN_SCREEN_SCENE } from "../botMainScreen/botMainScreen.scene";

export const GAMES_SCENE = "GAMES_SCENE";

const ACTIONS = {
    BACK: "back",
};

@Scene(GAMES_SCENE)
export class BotGamesScene {
    @SceneEnter()
    async enter(@Ctx() context: SceneContext) {
        context.reply("Выберете игру 🎮 чтобы начать.", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Слоты 🎰", callback_data: "4" },
                        { text: "Колесо фортуны🍀", callback_data: "4" },
                    ],
                    [{ text: "Куб удачи 🎲", callback_data: "4" }],
                    [{ text: "Назад", callback_data: ACTIONS.BACK }],
                ],
            },
        });
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
