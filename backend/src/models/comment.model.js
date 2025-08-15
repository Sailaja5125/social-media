import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
 user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
 },
 post:{
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
 },
 content:{
    type: String,
    maxLength: 280,
    required: true
 },
 likes:[
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
 ]
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;