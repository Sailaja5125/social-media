import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
clerkId: {
    type:String,
    required: true,
    unique:true
},
email:{
    type:String,
    required: true,
    unique:true
},
firstName:{
    type:String,
    required: true
},
lastName:{
    type:String,
    required: true
},
username:{
    type:String,
    required: true,
    unique:true
},
profileImage:{
    type:String,
    default:"",
},
bannerImage:{
    type:String,
    default:"",
},
bio:{
    type:String,
    maxLength: 160,
    default:""
},
followers: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
],
following:[
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;