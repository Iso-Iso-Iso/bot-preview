import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { GAMES_SCENE } from "../botGames/botGames.scene";
import { PROFILE_SCENE } from "../botProfile/botProfile.scene";
import { DEPOSIT_SELECT_SCENE } from "../botDeposit/scenes/depositSelect.scene";
import { AGREEMENT_SCENE } from "../botAgreement/botAgreement.scene";
import { WITHDRAW_SELECT_SCENE } from "../botWithdraw/scenes/withdrawSelect.scene";

export const MAIN_SCREEN_SCENE = "MAIN_SCREEN_SCENE";

const ACTIONS = {
    GAMES: "games",
    PROFILE: "profile",
    DEPOSIT: "deposit",
    HELP: "help",
    AGREEMENT: "agreement",
    WITHDRAW: "withdraw",
    REFERAL: "referal",
    BACK: "back",
};

@Scene(MAIN_SCREEN_SCENE)
export class BotMainScreenScene {
    @SceneEnter()
    async enter(@Ctx() context: SceneContext) {
        const text = "🎰🎰🎰 Casino for winner$ 🎰🎰🎰";

        await context.reply(text, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Играть 🎮", callback_data: ACTIONS.GAMES }],
                    [
                        { text: "Профиль 👤", callback_data: ACTIONS.PROFILE },
                        { text: "Пригласить друга 🤝", callback_data: ACTIONS.REFERAL },
                    ],
                    [
                        { text: "Пополнение 💰", callback_data: ACTIONS.DEPOSIT },
                        { text: "Вывод ⬇️", callback_data: ACTIONS.WITHDRAW },
                    ],
                    [
                        { text: "Помощь ℹ️", callback_data: ACTIONS.HELP },
                        { text: "Соглашение ✅", callback_data: ACTIONS.AGREEMENT },
                    ],
                ],
            },
        });
    }

    @Action(ACTIONS.GAMES)
    async onGames(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(GAMES_SCENE);
    }

    @Action(ACTIONS.PROFILE)
    async onProfile(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(PROFILE_SCENE);
    }

    @Action(ACTIONS.DEPOSIT)
    async onWallet(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(DEPOSIT_SELECT_SCENE);
    }

    @Action(ACTIONS.WITHDRAW)
    async onWithdraw(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(WITHDRAW_SELECT_SCENE);
    }

    @Action(ACTIONS.AGREEMENT)
    async onAgreement(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(AGREEMENT_SCENE);
    }

    @Action(ACTIONS.REFERAL)
    async onReferal(@Ctx() ctx: SceneContext) {
        await ctx.reply("Приведи друга и получи 10 WIN");
    }

    @Action(ACTIONS.HELP)
    async onHelp(@Ctx() ctx: SceneContext) {
        await ctx.reply(
            "Если у вас возникли какие-то проблемы или вопросы, вы всегда можете обратиться в поддержку: @teHox",
            { reply_markup: { inline_keyboard: [[{ text: "Назад", callback_data: ACTIONS.BACK }]] } },
        );
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
