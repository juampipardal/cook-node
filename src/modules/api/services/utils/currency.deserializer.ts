import { Currency } from "../../models/currency";
import { CurrencyResponse } from "../responses/currency.response";

export class CurrencyDeserializer {

    static DeserializeCurrency(currency: CurrencyResponse, iso: string): Currency {
        return new Currency(iso, CurrencyDeserializer.getCurrencySymbol(iso), currency.result)
    }


    private static getCurrencySymbol(currency: string): string {
        return (0).toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }
        ).replace(/\d/g, '').trim()
    }
}

  