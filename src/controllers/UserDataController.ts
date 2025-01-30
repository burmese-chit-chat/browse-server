import { Request, Response } from "express";
import UserData from "../models/UserData";
import { send_error_response, send_response } from "../helpers/response";

const UserDataController = {
    async show_with_user_id(req : Request, res : Response) {
        try {
            const { user_id } = req.params;
            if(!user_id) throw new Error("id is required, something went wrong");
            const user_data = await UserData.findOne({ user_id : user_id });
            if(!user_data) throw new Error("user data not found");
            send_response(res, 200, user_data, "user data found");
        } catch (e) {
            console.log(e);
            send_error_response(res, 400, (e as Error).message);
        }
    }
}

export default UserDataController;