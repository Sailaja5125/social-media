import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
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

const Post = mongoose.model("Post", postSchema);

export default Post;