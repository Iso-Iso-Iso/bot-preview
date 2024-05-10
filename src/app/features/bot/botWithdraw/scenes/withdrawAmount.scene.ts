import { Action, Ctx, Hears, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { WITHDRAW_SELECT_SCENE } from "./withdrawSelect.scene";
import { WITHDRAW_NETWORK_SCENE } from "./withdrawTo.scene";
import { BalancesService } from "../../../balances/balances.service";
import { UsersService } from "../../../users/users.service";

export const WITHDRAW_AMOUNT_SCENE = "WITHDRAW_AMOUNT_SCENE";

const ACTIONS = {
    BACK: "back",
};

@Scene(WITHDRAW_AMOUNT_SCENE)
export class WithdrawAmountScene {
    constructor(
        private readonly balancesService: BalancesService,
        private readonly usersService: UsersService,
    ) {}

    @SceneEnter()
    async enter(@Ctx() ctx: SceneContext) {
        await ctx.reply("Введите сумму вывода", {
            reply_markup: { inline_keyboard: [[{ text: "Назад", callback_data: ACTIONS.BACK }]] },
        });
    }

    @Hears(/[0-9]*$/)
    async onSumEnter(@Ctx() ctx: SceneContext) {
        // @ts-ignore
        const amount = +ctx.match[0];
        // @ts-ignore
        if (!ctx.session.withdrawBy) {
            return;
        }

        const userEntity = await this.usersService.getUserByTelegramId(ctx.from.id);

        const canUserWithdraw = await this.balancesService.canUserWithdraw({ amount, userId: userEntity.id });

        if (!canUserWithdraw) {
            await ctx.reply("Вы не можете вывести больше, чем у вас на активном балансе!");
            await ctx.scene.enter(WITHDRAW_AMOUNT_SCENE);
            return;
        }
        // @ts-ignore
        ctx.session.amount = amount;

        await ctx.scene.enter(WITHDRAW_NETWORK_SCENE);
    }

    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(WITHDRAW_SELECT_SCENE);
    }
}
