import { createClient, RedisClientType } from 'redis';

class RedisClient {

    readonly client: RedisClientType;
    private static isReady = false;

    constructor() {
        this.client = createClient({
            url: 'redis://default:khhHDajoKz2suvNtFQg2@containers-us-west-96.railway.app:7788' // should be in .env file
        });
        
        this.client.on('error', err => {
            console.error({ error: new Error(`Error in redis ${err.message}`) });
            RedisClient.isReady = false;
        });
        this.client.on('ready', () => {
            console.log({ name: 'redis-event', message: 'redis is ready!' });
            RedisClient.isReady = true;
        });
        this.client.on('connect', () => {
            console.log({ name: 'redis-event', message: 'redis is connecting...' });
        });
    }

    public async connect(): Promise<void> {
        return this.client.connect();
    }

    public async disconnect(): Promise<boolean | void> {
        RedisClient.isReady && (await this.client.quit());
    }

    public isCacheReady(): boolean {
        return this.client && RedisClient.isReady;
    }
}

const redisClient = new RedisClient();

export { redisClient, RedisClient };
