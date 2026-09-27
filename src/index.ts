import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import redis from "redis";
import cors from 'cors';

dotenv.config();

export const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
        host:"cracker-face-swank-64703.db.redis.io",
        port: 13887
    }
})

redisClient.connect()
.then(()=> console.log("connected to redis"))
.catch(console.error);

const app = express();
app.use(cors());

app.use("/api/v1", songRoutes);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});