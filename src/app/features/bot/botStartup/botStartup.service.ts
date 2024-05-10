import { UsersService } from "../../users/users.service";
import { UserEntity } from "../../../shared/interfaces/user.interface";
import { Inject } from "@nestjs/common";

export class BotStartupService {
    @Inject()
    private readonly userService: UsersService;

    async upsertUser(userEntity: UserEntity): Promise<unknown> {
        const user = await this.userService.getUserByTelegramId(userEntity.telegramId);

        if (!user) {
            return this.userService.createUser(userEntity);
        }

        return this.userService.updateUser(userEntity);
    }
}
