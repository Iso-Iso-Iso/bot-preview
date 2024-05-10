import { Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { InvoicesModel } from "../../core/models/invoices.model";
import { InjectModel } from "@nestjs/sequelize";
import { InvoiceStatus } from "../../shared/enums/invoiceStatus.enum";

@Injectable()
export class InvoicesService {
    constructor(@InjectModel(InvoicesModel) private readonly invoicesModel: typeof InvoicesModel) {}

    async createInvoice({ amount, invoiceId, userId, chatId }, transaction: Transaction) {
        return this.invoicesModel.create(
            { amount, invoiceApiId: invoiceId, userId, status: InvoiceStatus.WAITING, chatApiId: chatId },
            {
                transaction,
            },
        );
    }

    async getInvoiceByInvoiceApiId({ invoiceApiId }) {
        return this.invoicesModel.findOne({ where: { invoiceApiId } });
    }

    async setInvoiceStatus({ id, status }, transaction: Transaction) {
        return this.invoicesModel.update({ status }, { where: { id }, transaction });
    }
}
