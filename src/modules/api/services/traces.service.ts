import { Service } from "jazeera/src/lib/decorators";
import { Currency } from "../models/currency";
import { Location } from "../models/location";
import { Trace } from "../models/trace";
import { CurrencyService } from "./currency.service";
import { GeolocationService } from "./geolocation.service";
import { TrackingService } from "./tracking.service";
import { ClientError } from "./utils/base-error";

@Service()
export class TracesService {

    constructor(
        private readonly geolocationService: GeolocationService,
        private readonly currencyService: CurrencyService,
        private readonly trackingService: TrackingService
    ) { }

    public async getTraceInformation(ip: string): Promise<Trace> {
        this.validateIp(ip);
        const location: Location = await this.geolocationService.fetchGeolocationByIp(ip);
        this.validateCurrency(location, ip);
        const currency = await this.currencyService.fetchCurrencyConversionRate(location.currency);
        const currencies: Currency[] = [currency, new Currency('USD', '$', 1)];

        const trace: Trace = new Trace(
            location.query,
            location.country,
            location.countryCode,
            location.lat,
            location.lon,
            currencies
        );

        this.trackingService.incrementCountry(trace.name);
        this.trackingService.setLongestDistanceCountryIfApplies(trace.name, trace.distanceToUsa);
        
        return trace;

    }    


    async getLongestDistanceCountry(): Promise<any> {
        return await this.trackingService.getLongestDistanceCountry();
    }

    

    private validateIp(ip: string): void {
        if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))) {  
            throw new ClientError(`The given IP is not valid: ${ip}`);
        }
    }

    private validateCurrency(location: Location, ip: string) { 
        if (!location.currency) {
            throw new ClientError(`Not available currency for given ip: ${ip}`);
        }
    }
}