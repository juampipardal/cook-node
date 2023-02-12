import { Location } from "../../models/location";
import { LocationResponse } from "../responses/location.response";

export class LocationDeserializer {

    public static DeserializeLocation(location: LocationResponse): Location {
        return new Location(location.country, location.query, location.countryCode, location.lat, location.lon, location.currency);
    }

}