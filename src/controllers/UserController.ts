import { Request, Response } from "express";
import User from "../models/User";
import { send_error_response, send_response } from "../helpers/response";

const UserController = {
    async show_with_username (req : Request, res : Response) {
        try {
            const { username } = req.params;
            if(!username) throw new Error("user not found");
            const user = await User.show_with_username(username);
            if(!user) throw new Error("user not found");
            send_response(res, 200, user, "user found");
        } catch (e) {
            console.log(e);
            send_error_response(res, 404, (e as Error).message);
        }
    }
}

export default UserController;