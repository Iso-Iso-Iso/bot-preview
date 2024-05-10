import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SlotsModel } from "../../../core/models/slots.model";

@Injectable()
export class SlotMachineService {
    constructor(@InjectModel(SlotsModel) private readonly slotsModel: typeof SlotsModel) {}

    public async getLastUserGame({ userId }) {
        return this.slotsModel.findOne({ where: { userId }, order: [["createdAt", "DESC"]] });
    }

    public async createGame({ strategy, userId }) {
        return this.slotsModel.create({ strategy, userId });
    }
}
