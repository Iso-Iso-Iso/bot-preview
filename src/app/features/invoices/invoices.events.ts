import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InvoicePaidEventPayload } from "../../shared/interfaces/invoicePaidEventPayload.interface";
import { BalancesService } from "../balances/balances.service";
import { Sequelize } from "sequelize-typescript";
import { InvoicesService } from "./invoices.service";
import { InvoiceStatus } from "../../shared/enums/invoiceStatus.enum";

export enum InvoiceEvents {
    PAID = "invoices.paid",
}

@Injectable()
export class InvoicesEvents {
    constructor(
        private readonly balancesService: BalancesService,
        private readonly sequelize: Sequelize,
        private readonly invoicesService: InvoicesService,
    ) {}

    @OnEvent(InvoiceEvents.PAID, { async: true })
    async invoicePaid(payload: InvoicePaidEventPayload) {
        const { status, paid_amount: paidAmount, invoice_id: invoiceApiId } = payload;

        if (status !== "paid") {
            return;
        }

        const invoice = await this.invoicesService.getInvoiceByInvoiceApiId({ invoiceApiId });

        await this.sequelize.transaction(async (t) => {
            await this.balancesService.addAmountToActive({ amount: +paidAmount, userId: invoice.userId }, t);
            await this.invoicesService.setInvoiceStatus({ id: invoice.id, status: InvoiceStatus.PAID }, t);
        });
    }
}
