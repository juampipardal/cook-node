import { GeolocationService } from "../../../../src/modules/api/services/geolocation.service";
import { TrackingService } from "../../../../src/modules/api/services/tracking.service";
import { CurrencyService } from "../../../../src/modules/api/services/currency.service";
import { TracesService } from "../../../../src/modules/api/services/traces.service";
import { geolocationCurrencyUndefinedMock, geolocationMock } from "./mocks/geolocation.mock";
import { currencyMock } from "./mocks/currency.mock";


describe('Traces service tests', () => {
    
    let geolocationService = new GeolocationService();
    let trackingService = new TrackingService();
    let currencyService = new CurrencyService();

    let tracesService = new TracesService(geolocationService, currencyService, trackingService);


    it('Should return trace information', async () => {

        geolocationService.fetchGeolocationByIp = jest.fn().mockImplementation(() => {
			return Promise.resolve(geolocationMock);
		});

        trackingService.incrementCountry = jest.fn().mockImplementation(() => {
			return Promise.resolve();
		});

        trackingService.setLongestDistanceCountryIfApplies = jest.fn().mockImplementation(() => {
			return Promise.resolve();
		});

        currencyService.fetchCurrencyConversionRate = jest.fn().mockImplementation(() => {
			return Promise.resolve(currencyMock);
		});

        const trace = await tracesService.getTraceInformation('92.59.176.53');

        expect(trace.name).toBe('Spain');
        expect(trace.currencies.length).toBe(2);

    });

    it('Should throw the exception: Not available currency for given ip', async () => {

        geolocationService.fetchGeolocationByIp = jest.fn().mockImplementation(() => {
			return Promise.resolve(geolocationCurrencyUndefinedMock);
		});

        currencyService.fetchCurrencyConversionRate = jest.fn().mockImplementation(() => {
			return Promise.reject();
		});

        expect(async () => await tracesService.getTraceInformation('92.59.176.53')).rejects.toThrowError(Error);

    });

    it('Should throw the exception: The given IP is not valid', async () => {

        geolocationService.fetchGeolocationByIp = jest.fn().mockImplementation(() => {
			return Promise.resolve(geolocationCurrencyUndefinedMock);
		});

        currencyService.fetchCurrencyConversionRate = jest.fn().mockImplementation(() => {
			return Promise.reject();
		});

        expect(async () => await tracesService.getTraceInformation('__invalid_ip__')).rejects.toThrowError(Error);

    });

});