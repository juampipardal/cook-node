export class Currency {
    constructor(readonly iso: string, readonly symbol: string, readonly conversionRate: number) {
        this.iso = iso;
        this.symbol = symbol;
        this.conversionRate = conversionRate;
    }

    public toPrimitives() {
        return {
            iso: this.iso,
            symbol: this.symbol,
            conversion_rate: this.conversionRate
        }
    }
}