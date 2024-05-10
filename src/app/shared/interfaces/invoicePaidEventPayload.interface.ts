enum Assets {
    USDT = "USDT",
    TON = "TON",
    BTC = "BTC",
    ETH = "ETH",
    LTC = "LTC",
    BNB = "BNB",
    TRX = "TRX",
    USDC = "USDC",
}

enum Fiat {
    USD = "USD",
    UAH = "UAH",
}

enum Status {
    ACTIVE = "active",
    PAID = "paid",
    EXPIRED = "expired",
}

// https://help.crypt.bot/crypto-pay-api#Invoice
export interface InvoicePaidEventPayload {
    invoice_id: number;
    hash: string;
    asset: Assets;
    fiat: Fiat;
    amount: string;
    paid_asset: string;
    paid_amount: string;
    paid_fiat_rate: string;
    status: Status;
}
