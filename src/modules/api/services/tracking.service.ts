import { Service } from "jazeera/src/lib/decorators";
import { redisClient } from "../../../cache/redis";


@Service()
export class TrackingService {

    async incrementCountry(country: string) {
        await redisClient.client.incr(`country:${country}`);
    }

    async getCountersFromRedis() {
        const keys = await redisClient.client.keys("country:*");
        const counters = await redisClient.client.mGet(keys);
        return keys.map((key, idx) => ({country: key.replace('country:', ''), counter: Number(counters[idx]) }));
    }

    async setLongestDistanceCountryIfApplies(country: string, distance: number): Promise<unknown> {
        const currentLongestDistance = await this.getLongestDistanceCountry();;
        if (!currentLongestDistance) {
            await redisClient.client.set('longest-distance', JSON.stringify({country, distance}));
            return;
        }

        if (distance > currentLongestDistance.distance ) {
            await redisClient.client.set('longest-distance', JSON.stringify({country, distance}));
        }
    }

    async getLongestDistanceCountry(): Promise<any> {
        const longestDistance = await redisClient.client.get('longest-distance');
        if (!longestDistance) return null;
        return JSON.parse(longestDistance);
    }

    async getMaxCounter(): Promise<any> {
        const counters = await this.getCountersFromRedis();
        return counters.reduce((prev, current) => {
            return (prev.counter > current.counter) ? prev : current
        });

    }

}
