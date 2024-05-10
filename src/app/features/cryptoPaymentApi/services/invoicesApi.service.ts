import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs";

@Injectable()
export class InvoicesApiService {
    constructor(private readonly httpService: HttpService) {}

    createInvoice(amount: number) {
        return this.httpService.post("/api/createInvoice", {
            asset: "USDT",
            amount,
            accepted_assets: "USDT",
        });
    }

    getInvoices() {
        return this.httpService
            .get("/api/getInvoices")
            .pipe(map((res) => res.data.result))
            .pipe(map((item) => ({ list: item.items })));
    }
}
