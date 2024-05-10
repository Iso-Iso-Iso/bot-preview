import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { PaymentType } from "../enums/paymentType.enum";
import { SELECT_PAYMENT_METHOD } from "./selectPaymentMethod.scene";
import { SceneContextWithMatch } from "../../../../shared/interfaces/sceneContextWithMatch";
import { CRYPTO_DEPOSIT_SCENE_NAME } from "./cryptoDeposit.scene";
import { UsersService } from "../../../users/users.service";
import { COIN_NAME } from "../../../../shared/constants/coin.constant";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";

export const DEPOSIT_SELECT_SCENE = "DEPOSIT_SELECT_SCENE";

const ACTIONS = {
    BACK: "BACK",
};

@Scene(DEPOSIT_SELECT_SCENE)
export class DepositSelectScene {
    constructor(private readonly usersService: UsersService) {}

    @SceneEnter()
    async enter(@Ctx() context: SceneContext) {
        const userTelegramId = context.from.id;

        const user = await this.usersService.getUserByTelegramId(userTelegramId, { isWithBalance: true });

        const text =
            `🎰🎰🎰 Casino for winner$ 🎰🎰🎰` +
            "\n\n" +
            `Ваш активный игровой баланс: ${user.balance.active} ${COIN_NAME}` +
            "\n\n" +
            `Ожидает вывода: ${user.balance.withdrawing} ${COIN_NAME}` +
            "\n\n" +
            `Ожидает подтверждения: ${user.balance.hold} ${COIN_NAME}`;

        await context.reply(text, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Пополнить USDT 💸", callback_data: PaymentType.CRYPTO }],
                    [{ text: "Пополнить UAH 🇺🇦", callback_data: PaymentType.UAH }],
                    [{ text: "Назад", callback_data: ACTIONS.BACK }],
                ],
            },
        });
    }

    @Action([PaymentType.UAH])
    async onDeposit(@Ctx() ctx: SceneContextWithMatch<PaymentType>) {
        await ctx.scene.enter(SELECT_PAYMENT_METHOD, {
            paymentType: ctx.match[0],
        });
    }

    @Action(PaymentType.CRYPTO)
    async onCrypto(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(CRYPTO_DEPOSIT_SCENE_NAME);
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
