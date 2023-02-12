import axios, { AxiosResponse } from "axios";
import { Service } from "jazeera/src/lib/decorators";
import { Location } from "../models/location";
import { LocationResponse } from "./responses/location.response";
import { LocationDeserializer } from "./utils/location.deserializer";

@Service()
export class GeolocationService {

    static GEOLOCATION_API_URL: string = 'http://ip-api.com/json/:ip?fields=country,countryCode,lat,lon,currency,query';

    async fetchGeolocationByIp(ip: string): Promise<Location> {
        const url = GeolocationService.GEOLOCATION_API_URL.replace(':ip', ip);
        try {
            const response: AxiosResponse<LocationResponse> =  await axios.get<LocationResponse>(url);
            return LocationDeserializer.DeserializeLocation(response.data);
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

}