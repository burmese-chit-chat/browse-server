import mongoose, { Schema } from "mongoose";
import IUser from "../types/IUser";
import UserData from "./UserData";
import SearchString from "./SearchString";

interface IUpdateFunction {
    _id : mongoose.Types.ObjectId;
    name? : string;
    secure_url? : string; 
    gender? : string;
    age? : number; 
    region? : string;
    public_id? : string
}
interface IUserModel extends mongoose.Model<IUser> {
    show_with_username(username : string) : Promise<IUser>;
}


const UserSchema = new Schema<IUser>({
    username : {
        type: String,
        required: true,
        unique: true
    }, 
    password : {
        type: String,
        required: true
    }, 
    name : {
        type: String, 
        required: false
    }, 
    profile : {
        type : Object, 
        required: false
    }, 
    is_verified : {
        type: Boolean, 
        required: true, 
        default : false
    }, 
    gender : {
        type : String, 
        required: false, 
        max : 10
    }, 
    age : {
        type : Number, 
        required : false,
        max : 100
    }, 
    region : {
        type : String, 
        required : false
    }
}, { timestamps: true });

UserSchema.statics.show_with_username = async function(username : string) : Promise<IUser> {
    try {
        const user = await this.findOne({username});
        if(!user) throw new Error("user not found");
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const User : IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;