import { Action, Ctx, Hears, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { PaymentType } from "../enums/paymentType.enum";
import { SceneContextWithSessionState } from "../../../../shared/interfaces/sceneContextWithSessionState";
import { DEPOSIT_CARDS, UAH_CARDS } from "../../../../shared/constants/depositCards.constant";
import { SceneContextWithMatch } from "../../../../shared/interfaces/sceneContextWithMatch";
import { BankCards } from "../../../../shared/enums/bankCards.enum";
import { DEPOSIT_SCENE } from "./deposit.scene";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";

export const SELECT_PAYMENT_METHOD = "SELECT_PAYMENT_METHOD";

interface SceneState {
    paymentType: PaymentType;
}

const cards = {
    [PaymentType.UAH]: UAH_CARDS,
};

const ACTIONS = {
    BACK: "back",
};
@Scene(SELECT_PAYMENT_METHOD)
export class SelectPaymentMethodScene {
    @SceneEnter()
    async enter(@Ctx() ctx: SceneContextWithSessionState<SceneState>) {
        const paymentType = ctx.scene.session.state.paymentType;

        const paymentNames = cards[paymentType];
        const reply = "Выберите карту для пополнения";

        const buttons = paymentNames.map((item) => ({ text: item, callback_data: item }));

        await ctx.reply(reply, {
            reply_markup: {
                inline_keyboard: [buttons, [{ text: "Назад", callback_data: ACTIONS.BACK }]],
            },
        });
    }

    @Action(DEPOSIT_CARDS)
    async onCardDeposit(@Ctx() ctx: SceneContextWithMatch<BankCards>) {
        const cardName = ctx.match[0];

        // @ts-ignore
        ctx.session.cardName = cardName;

        await ctx.reply("Введите количесвто средств на пополнение.");
    }

    @Hears(/[0-9]*/)
    async onValueEnter(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(DEPOSIT_SCENE, {
            // @ts-ignore
            cardName: ctx.session.cardName,
        });
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
