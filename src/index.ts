import { Server } from "socket.io";
import express from "express";
import { Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import UserRoutes from "./routes/users";
import UserDataRoutes from "./routes/userdatas";
import { setupSocket } from "./helpers/socket-handler";
require("dotenv").config();

const PORT: Readonly<number> = 8002;
const mongo_url = process.env.MONGO_URL;
if (!mongo_url) {
    throw new Error("MONGO_URL is not defined");
}

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    console.log('path', req.path);
    res.send("hello world from burmese chit chat BROWSING service");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use('/users', UserRoutes);
app.use('/userdata', UserDataRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL, // e.g., "http://localhost:3000"
        methods: ["GET", "POST"],
        credentials: true,
    },
});
setupSocket(io);
mongoose
    .connect(mongo_url, {})
    .then(() => {
        console.log("connected to user database");
        server.listen(PORT, () => {
            console.log("burmese chit chat browse server is running on port " + PORT);
        });
    })
    .catch(err => {
        console.error(err);
    });
