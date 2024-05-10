import { Module } from "@nestjs/common";
import { SlotMachineService } from "./slotMachine.service";
import { SlotMachineController } from "./slotMachine.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { SlotsModel } from "../../../core/models/slots.model";
import { UsersModule } from "../../users/users.module";

@Module({
    imports: [SequelizeModule.forFeature([SlotsModel]), UsersModule],
    controllers: [SlotMachineController],
    providers: [SlotMachineService],
})
export class SlotMachineModule {}
