import { Service } from "jazeera/src/lib/decorators";
import axios, { AxiosResponse } from "axios";
import { Currency } from "../models/currency";
import { CurrencyResponse } from "./responses/currency.response";
import { CurrencyDeserializer } from "./utils/currency.deserializer";
import { redisClient } from "../../../cache/redis";


@Service()
export class CurrencyService {

    private static CURRENCY_API_URL = 'https://api.apilayer.com/fixer/convert?to=USD&from=:from&amount=1';

    constructor() { }
    
    async fetchCurrencyConversionRate(currency: string): Promise<Currency> {

        const url = CurrencyService.CURRENCY_API_URL.replace(':from', currency);

        const cachedResult = await this.getCurrencyFromCache(currency);

        if (cachedResult) {
            return cachedResult;
        }

        try {
            
            const response: AxiosResponse<CurrencyResponse> =  await axios.get<CurrencyResponse>(url, {
                headers: {
                    apikey: 'EEiwMsX5c6d97Fl6HTwDr82Rcg9T62Kr' // SHOULD BE IN .ENV
                }
            });

            const deserializedCurrency = CurrencyDeserializer.DeserializeCurrency(response.data, currency)
            await this.setCurrencyInCache(deserializedCurrency);
            return deserializedCurrency;
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    private async getCurrencyFromCache(currency: string): Promise<Currency> {
        const response = await redisClient.client.get(`currency-${currency}`);
        if (!response) return null;
        const parsed = JSON.parse(response);
        return new Currency(parsed.iso, parsed.symbol, parsed.conversionRate);
    }

    private async setCurrencyInCache(currency: Currency): Promise<any> {
        await redisClient.client.set(`currency-${currency.iso}`, JSON.stringify(currency), { EX: 60 * 60 * 24 });  // ONE DAY
    }

}