import { Body, Controller, Get, Post } from "@nestjs/common";
import { InvoicesApiService } from "../cryptoPaymentApi/services/invoicesApi.service";
import { InvoiceEvents } from "./invoices.events";
import { EventEmitter2 } from "@nestjs/event-emitter";

const UPDATE_TYPES = {
    invoice_paid: InvoiceEvents.PAID,
};

@Controller("/api/v1/invoices")
export class InvoicesController {
    constructor(
        private readonly invoicesApiService: InvoicesApiService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Get()
    getInvoices() {
        return this.invoicesApiService.getInvoices();
    }

    @Post()
    onUpdate(@Body() body) {
        const { update_type, payload } = body;

        this.eventEmitter.emit(UPDATE_TYPES[update_type], payload);
    }
}
