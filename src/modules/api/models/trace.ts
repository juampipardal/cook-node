import { distanceToUS } from "../services/utils/utils";
import { Currency } from "./currency";

export class Trace {

    readonly distanceToUsa: number;

    constructor(
        readonly ip: string,
        readonly name: string,
        readonly code: string,
        readonly lat: number,
        readonly lon: number,
        readonly currencies: Currency[]
    ) {
     
        this.ip = ip;
        this.name = name;
        this.code = code;
        this.lat = lat;
        this.lon = lon;
        this.currencies = currencies;
        this.distanceToUsa = this.code === 'USD' ? 0 : Number(distanceToUS(this.lat, this.lon).toFixed(2));
    }


    public toPrimitives() {
        return {
            ip: this.ip,
            name: this.name,
            code: this.code,
            lat: this.lat,
            lon: this.lon,
            currencies: this.currencies.map(curr => curr.toPrimitives()),
            distance_to_usa: this.distanceToUsa
        }
    }
}