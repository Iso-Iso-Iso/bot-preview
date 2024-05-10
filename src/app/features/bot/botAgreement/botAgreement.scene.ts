import { Action, Ctx, Scene, SceneEnter } from "nestjs-telegraf";
import { SceneContext } from "telegraf/scenes";
import { MAIN_SCREEN_SCENE } from "../botMainScreen/botMainScreen.scene";

export const AGREEMENT_SCENE = "AGREEMENT_SCENE";

const ACTIONS = {
    BACK: "back",
};

const text = `
1.1 Настоящее Пользовательское Соглашение регулирует отношения между владельцем Бота с одной стороны и пользователем сервиса с другой.

1.2 Используя сервис, Вы соглашаетесь с условиями данного соглашения.

2.Права и обязанности сторон

2.1 Администрация имеет право:
- ограничивать доступ к любой информации на сервисе;

- создавать, изменять, удалять информацию; 

- заблокировать ваш аккаунт в случае нарушения правил или подозрения в нарушениях до выяснения обстоятельств

3. Пользователь имеет право:
- пользоваться услугами предоставляемые сервисом;

- использовать информацию сервиса в личных некоммерческих целях в рамках Уголовного Кодекса.

4. Пользователь обязуется:
- пользоваться услугами предоставляемые сервисом;

-  не распространять ложную информацию в адрес данного сервиса;

- вести себя подобающе в адрес администрации и других пользователей сервиса  

- не пытаться обмануть администрацию проекта и других участников

5. Условия Соглашения

5.1 Данное Соглашение вступает в силу при регистрации на сервисе, которое происходит посредством прописания /start;

5.2 Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению;

5.3 Соглашение перестает действовать при появлении его новой версии;

5.4 Администрация не оповещает пользователей об изменении в Соглашении;

5.5 Любые пополнения сервиса являются невозвратным пожертвованием;

6. Обязательства перед выводом средств:

-отыгрыш 75% от суммы депозита

7. Утеря доступа к аккаунту.

7.1 В случае утери доступа к аккаунту телеграмм, или в случае его удаления , баланс в боте НЕВОЗМОЖНО вернуть , вывести или перенести на другой аккаунт.

8. Баги , ошибки , абуз.
8.1 Не использовать найденные баги/ошибки в проекте, за нарушение - блокировка и не возврат средств с баланса.`;

@Scene(AGREEMENT_SCENE)
export class BotAgreementScene {
    @SceneEnter()
    async enter(@Ctx() context: SceneContext) {
        await context.reply(text, {
            reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: ACTIONS.BACK }]],
            },
        });
    }
    @Action(ACTIONS.BACK)
    async onBack(@Ctx() ctx: SceneContext) {
        await ctx.scene.enter(MAIN_SCREEN_SCENE);
    }
}
