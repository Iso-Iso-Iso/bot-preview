import { UserEntity } from "../../../shared/interfaces/user.interface";

export class BotStartupHelper {
    static getGreetingMessage(userEntity: UserEntity) {
        return (
            `🎰🎰🎰 Casino for winner$ 🎰🎰🎰` +
            "\n\n" +
            `Рады приветствовать в лучшем казино на просторах Telegram, ${userEntity.firstName}.` +
            "\n\n" +
            `Для продолжения, пожалуйста, подпишитесь на наш официальный телеграмм канал.`
        );
    }
}
