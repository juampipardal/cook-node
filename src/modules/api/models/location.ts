export class Location {

    constructor(
        readonly country: string,
        readonly query: string,
        readonly countryCode: string,
        readonly lat: number,
        readonly lon: number,
        readonly currency: string
    ) {
        this.country = country;
        this.query = query;
        this.countryCode = countryCode;
        this.lat = lat;
        this.lon = lon;
        this.currency = currency;
    }

}