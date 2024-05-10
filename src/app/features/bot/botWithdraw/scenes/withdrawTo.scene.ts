import { Action, Ctx, Hears, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { WITHDRAW_SELECT_SCENE, withdraws } from "./withdrawSelect.scene";
import { WithdrawsService } from "../../../withdraws/withdraws.service";
import { UsersService } from "../../../users/users.service";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";
import { Sequelize } from "sequelize-typescript";
import { BalancesService } from "../../../balances/balances.service";

export const WITHDRAW_NETWORK_SCENE = "WITHDRAW_NETWORK_SCENE";

const ACTIONS = {
    BACK: "back",
};

@Scene(WITHDRAW_NETWORK_SCENE)
export class WithdrawToScene {
    constructor(
        private readonly withdrawsService: WithdrawsService,
        private readonly usersService: UsersService,
        private readonly balancesService: BalancesService,
        private readonly sequelize: Sequelize,
    ) {}

    @SceneEnter()
    async enter(@Ctx() ctx: SceneContext) {
        let text = "Введите карту для вывода";

        // @ts-ignore
        if (withdraws.crypto === ctx.session.withdrawBy) {
            text = "Введите сеть и адрес кошелька";
        }

        await ctx.reply(text, {
            reply_markup: { inline_keyboard: [[{ text: "Назад", callback_data: ACTIONS.BACK }]] },
        });
    }

    @Hears(/[a-zA-Z0-9]*$/)
    async onSumEnter(@Ctx() ctx: SceneContext) {
        // @ts-ignore
        const to = ctx.match[0];
        // @ts-ignore
        const { withdrawBy, amount, network } = ctx.session;

        const userTelegramId = ctx.from.id;

        const userEntity = await this.usersService.getUserByTelegramId(userTelegramId);

        try {
            const transaction = await this.sequelize.transaction();

            await this.withdrawsService.createWithdraw({
                isCrypto: withdrawBy === withdraws.crypto,
                to,
                value: amount,
                network,
                userId: userEntity.id,
                transaction,
            });

            await this.balancesService.transferFromActiveToWithdrawing({ transaction, amount, userId: userEntity.id });

            await transaction.commit();

            await ctx.reply("Ваш запрос на вывод отправлен в обработку. В течении 24 часов вы получите средства!");
        } catch {
            await ctx.reply(
                "Произашла ошибка вывода. Попробуйте чуть позже. Свяжитесь с поддержкой для уточнения деталей.",
            );
        } finally {
            await ctx.scene.enter(MAIN_SCREEN_SCENE);
        }
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(WITHDRAW_SELECT_SCENE);
    }
}
