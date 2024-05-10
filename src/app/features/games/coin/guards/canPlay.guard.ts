import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../../../users/users.service";

@Injectable()
export class CanPlayGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { telegramId, bid } = request.body;

        const userEntity = await this.usersService.getUserByTelegramId(telegramId);

        return userEntity.balance.active >= bid;
    }
}
