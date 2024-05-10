import { UserEntity } from "../interfaces/user.interface";

export class UserHelper {
    static fromMessageToUserEntity(messageFrom): UserEntity {
        return {
            fullName: `${messageFrom.first_name} ${messageFrom.last_name}`,
            isBot: messageFrom.is_bot,
            firstName: messageFrom.first_name,
            languageCode: messageFrom.language_code,
            userName: messageFrom.username,
            lastName: messageFrom.last_name,
            telegramId: messageFrom.id,
        };
    }
}
