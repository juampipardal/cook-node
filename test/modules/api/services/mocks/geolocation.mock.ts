import { LocationDeserializer } from "../../../../../src/modules/api/services/utils/location.deserializer";

export const geolocationMock = LocationDeserializer.DeserializeLocation({
    "query": "92.59.176.53",
    "status": "success",
    "country": "Spain",
    "countryCode": "ES",
    "region": "CT",
    "regionName": "Catalonia",
    "city": "Barcelona",
    "zip": "08032",
    "lat": 41.387,
    "lon": 2.1701,
    "timezone": "Europe/Madrid",
    "currency": "EUR",
    "isp": "Uni2 XDSL customers YIF",
    "org": "",
    "as": "AS12479 Orange Espagne SA",
});

export const geolocationCurrencyUndefinedMock = LocationDeserializer.DeserializeLocation({
    "query": "92.59.176.53",
    "status": "success",
    "country": "Spain",
    "countryCode": "ES",
    "region": "CT",
    "regionName": "Catalonia",
    "city": "Barcelona",
    "zip": "08032",
    "lat": 41.387,
    "lon": 2.1701,
    "timezone": "Europe/Madrid",
    "currency": undefined,
    "isp": "Uni2 XDSL customers YIF",
    "org": "",
    "as": "AS12479 Orange Espagne SA",
});