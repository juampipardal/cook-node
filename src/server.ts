import app from "./app";
import { redisClient } from "./cache/redis";

const PORT = process.env.PORT || 3000;


async function startApp() {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Cannot connect with Redis', err);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Express server listening on port: ${PORT}`);
    });
}


startApp();