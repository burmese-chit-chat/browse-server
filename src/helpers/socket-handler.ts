// socketHandler.ts
import { Server, Socket } from "socket.io";
import User from "../models/User";

export const setupSocket = (io: Server) => {
    const userSocketMap = new Map<string, string>();
    io.on("connection", (socket: Socket) => {
        console.log("a user connected : ", socket.id);

        socket.on("user_connected", async (user_id: string) => {
            await User.findByIdAndUpdate(user_id, { is_active : true });
        });
        socket.on("user_disconnected", async (user_id: string) => {
            await User.findByIdAndUpdate(user_id, { is_active : false });
        });


        socket.on("disconnect", () => {
            console.log("a client disconnected");
            // Clean up the user-socket mapping
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
        });
    });
};
