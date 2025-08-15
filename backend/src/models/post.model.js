import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
content:{
    type: String,
    maxLength: 280
},
image:{
    type: String,
    default: ""
},
likes:[
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
],
comments:[
    {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;