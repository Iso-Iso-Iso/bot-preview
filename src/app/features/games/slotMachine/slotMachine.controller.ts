import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SlotVariants } from "./enums/slotVariants.enum";
import { SLOT_TRANSITIONS } from "./constants/slotTransition.constants";
import { SLOT_COMBINATIONS } from "./constants/slotCombinations.constants";
import { SlotResponseHelper } from "./helpers/slotResponse.helper";
import { SlotMachineService } from "./slotMachine.service";
import { UsersService } from "../../users/users.service";
import { SlotGamePipe } from "./pipes/slotGame.pipe";
import { CanPlayGuard } from "./guards/canPlay.guard";

@Controller("/api/v1/slot-machine")
@UseGuards(CanPlayGuard)
export class SlotMachineController {
    constructor(
        private readonly slotMachineService: SlotMachineService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    async playGame(@Body() body: SlotGamePipe) {
        const userEntity = await this.usersService.getUserByTelegramId(body.telegramId);

        const slotMachineEntity = await this.slotMachineService.getLastUserGame({ userId: userEntity.id });

        const strategy = slotMachineEntity?.strategy || SlotVariants.LOSE;

        const transitions = SLOT_TRANSITIONS[strategy];

        let nextGame = "";

        const getCombination = transitions.reduce((item: () => any, game) => {
            if (item) {
                return item;
            }

            if (SlotResponseHelper.isUserGainTransition(game)) {
                nextGame = game.variant;
                return SLOT_COMBINATIONS[game.variant];
            }

            return null;
        }, null);

        await this.slotMachineService.createGame({
            strategy: nextGame,
            userId: userEntity.id,
        });

        return { data: { gameResult: getCombination(), balance: 1000 } };
    }
}
