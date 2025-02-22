import { Request, Response } from "express";
import { send_error_response, send_response } from "../helpers/response";
import User from "../models/User";
import SearchString from "../models/SearchString";
import mongoose from "mongoose";
import "dotenv/config";

export default {
    index: async function (req: Request, res: Response) {
        const limit = process.env.USER_SEARCH_LIMIT ? Number(process.env.USER_SEARCH_LIMIT) : 5;
        // const limit = 1;
        try {
            const { page, search, gender } = req.query;
            console.log("gender", gender);
            console.log("type", Boolean(gender));
            let query = User.find();
            if (search) {
                const user_ids = await get_user_id_array(String(search));
                query = query.where("_id").in(user_ids);
            }
            if (gender) {
                query = query.where("gender").equals(gender);
            }
            const users = await query
                .sort({ is_active: -1, _id: 1 })
                .skip((Number(page) - 1) * limit)
                .limit(limit);
            
            const total_users = await User.countDocuments(query.getFilter());
            send_response(res, 200, users, "users found", undefined, { total: calculate_total_pages(total_users, limit), page: Number(page) });
        } catch (e) {
            console.log(e);
            send_error_response(res, 404, (e as Error).message);
        }
    },
};

async function get_user_id_array(search_keyword: string): Promise<mongoose.Types.ObjectId[]> {
    const searchRegex = new RegExp(search_keyword, "i");
    const userIds = await SearchString.distinct("user_id", {
        search_string: searchRegex,
    });
    return userIds;
}

function calculate_total_pages(total: number, limit: number): number {
    return Math.ceil(total / limit);
}
