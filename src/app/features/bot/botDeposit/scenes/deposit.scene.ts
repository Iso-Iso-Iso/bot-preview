import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContextWithSessionState } from "../../../../shared/interfaces/sceneContextWithSessionState";
import { BankCards } from "../../../../shared/enums/bankCards.enum";
import { CardsService } from "../../../cards/cards.service";
import { UsersService } from "../../../users/users.service";
import { UserHelper } from "../../../../shared/helpers/user.helper";
import { DepositsService } from "../../../deposits/deposits.service";
import { MAIN_SCREEN_SCENE } from "../../botMainScreen/botMainScreen.scene";

export const DEPOSIT_SCENE = "DEPOSIT_SCENE";

interface SceneState {
    cardName: BankCards;
}

const ACTIONS = {
    PAY: "PAY",
};

@Scene(DEPOSIT_SCENE)
export class DepositScene {
    constructor(
        private readonly depositsService: DepositsService,
        private readonly usersService: UsersService,
        private readonly cardsService: CardsService,
    ) {}

    @SceneEnter()
    async enter(@Ctx() ctx: SceneContextWithSessionState<SceneState>) {
        const { cardName } = ctx.scene.session.state;

        const cardEntity = await this.cardsService.getCardByBank(cardName);

        const reply =
            `Внесите депозит на карту ${cardEntity?.value}.` +
            "\n" +
            `После оплаты ваши средства перейдут в статус ожидания и отправяться на проверку.` +
            "\n" +
            `После проверки средства зачисляться на ваш активный счет`;

        await ctx.reply(reply, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Я оплатил",
                            callback_data: ACTIONS.PAY,
                        },
                    ],
                ],
            },
        });
    }

    @Action(ACTIONS.PAY)
    async onPay(@Ctx() ctx: SceneContextWithSessionState<SceneState>) {
        const userEntity = UserHelper.fromMessageToUserEntity(ctx.from);

        const { cardName } = ctx.scene.session.state;

        const cardEntity = await this.cardsService.getCardByBank(cardName);

        const user = await this.usersService.getUserByTelegramId(userEntity.telegramId);

        await this.depositsService.createDeposit({
            userId: user.id,
            value: 44,
            cardNumber: cardEntity.value,
        });
        // TODO: add hold logic
        await ctx.reply("Ваш депозит принят.");
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
