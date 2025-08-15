import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
from:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
to:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
type:{
    type: String,
    required: true,
    enum: ["follow", "like", "comment"],
},
post:{
    type: Schema.Types.ObjectId,
    ref: "Post",
    default: null
},
comment:{
    type: Schema.Types.ObjectId,
    ref: "Comment", 
    default: null
},
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;