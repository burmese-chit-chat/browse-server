import mongoose, { Schema } from "mongoose";
import ISearchString from "../types/ISearchString";

interface ISearchStringModel extends mongoose.Model<ISearchString> {
}

const SearchStringSchema = new Schema<ISearchString>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    search_string : {
        type : String, 
        required : false
    }
}, { timestamps : true });

const SearchString : ISearchStringModel = mongoose.model<ISearchString, ISearchStringModel>("SearchString", SearchStringSchema);
export default SearchString;