import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";
import { WITHDRAW_AMOUNT_SCENE } from "./withdrawAmount.scene";

export const WITHDRAW_SELECT_SCENE = "WITHDRAW_SELECT_SCENE";

export const withdraws = {
    crypto: "withdraw_crypto",
    uah: "withdraw_card_uah",
};

export const cryptoNetworks = {
    trc: "TRC20",
    bep: "BEP20",
    erc: "ERC20",
};

const ACTIONS = {
    WITHDRAW_CRYPTO: withdraws.crypto,
    WITHDRAW_CARD_UAH: withdraws.uah,
    BACK: "back",
    TRC: cryptoNetworks.trc,
    BEP: cryptoNetworks.bep,
    ERC: cryptoNetworks.erc,
};

@Scene(WITHDRAW_SELECT_SCENE)
export class WithdrawSelectScene {
    @SceneEnter()
    async enter(@Ctx() ctx: SceneContext) {
        await ctx.reply("Ссылка на телеграмм канал", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Вывод Crypto Bot", callback_data: ACTIONS.WITHDRAW_CRYPTO }],
                    [{ text: "Вывод на карту 🇺🇦", callback_data: ACTIONS.WITHDRAW_CARD_UAH }],
                    [{ text: "Назад", callback_data: ACTIONS.BACK }],
                ],
            },
        });
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }

    @Action([ACTIONS.WITHDRAW_CARD_UAH])
    async onCardWithdraw(@Ctx() ctx: SceneContext) {
        // @ts-ignore
        ctx.session.withdrawBy = ctx.match[0];

        await ctx.scene.enter(WITHDRAW_AMOUNT_SCENE);
    }

    @Action(ACTIONS.WITHDRAW_CRYPTO)
    async onCrypto(@Ctx() ctx: SceneContext) {
        // @ts-ignore
        ctx.session.withdrawBy = ctx.match[0];

        await ctx.reply("Выберете сеть крипто кошелька", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: cryptoNetworks.bep, callback_data: ACTIONS.BEP },
                        { text: cryptoNetworks.trc, callback_data: ACTIONS.TRC },
                        { text: cryptoNetworks.erc, callback_data: ACTIONS.ERC },
                    ],
                    [{ text: "Назад", callback_data: ACTIONS.BACK }],
                ],
            },
        });
    }

    @Action([ACTIONS.BEP, ACTIONS.TRC, ACTIONS.ERC])
    async onNetworkSelect(@Ctx() ctx: SceneContext) {
        // @ts-ignore
        ctx.session.network = ctx.match[0];

        await ctx.scene.enter(WITHDRAW_AMOUNT_SCENE);
    }
}
