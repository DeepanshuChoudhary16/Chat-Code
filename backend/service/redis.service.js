import Redis from 'ioredis'
import dotenv from 'dotenv';

dotenv.config({
    path:'./.env'
})

const redisClient = new Redis({
    host: process.env.REDIS_HOST ,
    port: process.env.REDIS_PORT ,
    password:process.env.REDIS_PASSWORD
});

redisClient.on('connect',()=>{
    console.log('Redis Connected')
})

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
