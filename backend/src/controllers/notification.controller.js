import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotification = asyncHandler(async(req , res)=>{
    const { userId } = getAuth(req);

    const user = await User.findOne({clerkId:userId});

    if(!user) return res.status(404).json({
        success:false,
        message:"User not found"
    })

    const notification = await Notification.find({
        to:user._id
    }).sort({createdAt: -1}).populate("from" , "username firstName lastName profileImage").populate("post" , "content image").populate("comment" , "content");

    res.status(200).json({notification});
})

export const deleteNotification = asyncHandler(async(req , res)=>{
    const { userId } = getAuth(req);
    const { notificationId } = req.params;

    const user = await User.findOne({clerkId:userId});

    if(!user) return res.status(404).json({
        success:false,
        message:"User not found"
    })

    const notification = await Notification.findByIdAndDelete({
        _id:notificationId,
        to:user._id
    })

    if(!notification) return res.status(404).json({
        error:"Notification not found"
    });

    res.status(200).json({
        message:"Notification deleted Successfully"
    });
})