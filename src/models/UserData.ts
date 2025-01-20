import mongoose, { Schema } from "mongoose";
import IUserData from "../types/IUserData";

interface IUserDataModel extends mongoose.Model<IUserData> {
}

const UserDataSchema = new Schema<IUserData>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    interests_1 : {
        type : String, 
        required : false
    },
    interests_2 : {
        type : String, 
        required : false
    },
    interests_3 : {
        type : String, 
        required : false
    },
    interests_4 : {
        type : String, 
        required : false
    },
    interests_5 : {
        type : String, 
        required : false
    },
    status_message : {
        type : String, 
        required : false
    },
    about_me : {
        type : String, 
        required : false
    },
}, { timestamps : true });


const UserData : IUserDataModel = mongoose.model<IUserData, IUserDataModel>("UserData", UserDataSchema);
export default UserData;