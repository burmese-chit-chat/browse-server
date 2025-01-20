import { Request, Response } from "express";
import { send_error_response, send_response } from "../helpers/response";
import User from "../models/User"

export default {
    index : async function (req : Request, res : Response) {
        try {
            const users = await User.find();
            send_response(res, 200, users, 'users found');
        } catch (e) {
            console.log(e);
            send_error_response(res, 404, (e as Error).message);
        }

    }
}