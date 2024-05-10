import { Action, Ctx, Hears, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { InvoicesApiService } from "../../../cryptoPaymentApi/services/invoicesApi.service";
import { SceneContextWithMessage } from "../../../../shared/interfaces/sceneContextWithMessage";
import { Sequelize } from "sequelize-typescript";
import { firstValueFrom } from "rxjs";
import { InvoicesService } from "../../../invoices/invoices.service";
import { BalancesService } from "../../../balances/balances.service";
import { UsersService } from "../../../users/users.service";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";

export const CRYPTO_DEPOSIT_SCENE_NAME = "CRYPTO_DEPOSIT_SCENE";

const ACTIONS = {
    BACK: "back",
};

@Scene(CRYPTO_DEPOSIT_SCENE_NAME)
export class CryptoDepositScene {
    constructor(
        private readonly invoicesApiService: InvoicesApiService,
        private readonly sequelize: Sequelize,
        private readonly invoicesService: InvoicesService,
        private readonly balancesService: BalancesService,
        private readonly usersService: UsersService,
    ) {}

    @SceneEnter()
    async enter(@Ctx() ctx: SceneContext) {
        const reply = `Введите сумму пополнения.`;

        await ctx.reply(reply, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Назад",
                            callback_data: ACTIONS.BACK,
                        },
                    ],
                ],
            },
        });
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContextWithMessage) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }

    @Hears(/[a-zA-Z]+/)
    async onInvalidSend(@Ctx() ctx: SceneContext) {
        await ctx.reply("Введите количество монет на пополнение.");
    }

    @Hears(/[0-9]+$/)
    async onSend(@Ctx() ctx: SceneContextWithMessage) {
        await ctx.reply("Создание инвойса.");

        try {
            const amount = +ctx.update.message.text;
            const userTelegramId = ctx.from.id;
            const chatId = ctx.chat.id;

            // TODO: remake with service
            await this.sequelize.transaction(async (t) => {
                const user = await this.usersService.getUserByTelegramId(userTelegramId);

                const $apiQuery = this.invoicesApiService.createInvoice(amount);

                const response = await firstValueFrom($apiQuery);

                const { invoice_id: invoiceId, pay_url: payUrl } = response.data.result;

                await this.invoicesService.createInvoice({ amount, invoiceId, userId: user.id, chatId }, t);

                await this.balancesService.addHoldToUserBalance({ userId: user.id, value: amount }, t);

                await ctx.reply(payUrl, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Готово",
                                    callback_data: ACTIONS.BACK,
                                },
                            ],
                        ],
                    },
                });
            });
        } catch {
            await ctx.reply("Произашла ошибки, попробуйте позже.");
        }
    }
}
