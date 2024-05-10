import { Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PaginationHelper } from "../../shared/helpers/pagination.helper";

@Controller("/api/v1/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(@Query("page", ParseIntPipe) page: number) {
        const usersCount = await this.usersService.getUsersCount();
        const meta = PaginationHelper.getPaginationMeta(usersCount);

        if (page > meta.totalPages || page < 1) {
            throw new NotFoundException();
        }

        const usersList = await this.usersService.getUsers(page, meta.perPage);

        return { list: usersList, meta };
    }

    @Get("/:id")
    getUserById(@Param("id", ParseIntPipe) userId: number) {
        return this.usersService.getUserById(userId);
    }

    @Get("/telegram/:id")
    async getUserByTelegramId(@Param("id", ParseIntPipe) telegramId: number) {
        const userEntity = await this.usersService.getUserByTelegramId(telegramId);
        return { data: userEntity };
    }

    @Post()
    createUser() {}

    @Put()
    updateUser() {}

    @Delete()
    deleteUser() {}
}
