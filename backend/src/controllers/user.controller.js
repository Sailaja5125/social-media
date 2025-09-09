import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js'; // Assuming you have a User model
import { clerkClient, getAuth } from '@clerk/express';
export const getUserProfile = asyncHandler(async(req, res)=>{
    const { username } = req.params;

    const user = await User.findOne({username})

    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    
   return res.status(200).json({user})
})

export const updateProfile = asyncHandler(async(req, res) => {
 const { userId } = getAuth(req);
 const user = await User.findOneAndUpdate({clerkId: userId} , req.body , { new: true });
 if(!user){
   return res.status(400).json({
       success: false,
       message: "User not found"
   });
 }

})

export const syncUser = asyncHandler(async(req, res) => {
 const { userId } = getAuth(req);
 const existingUser = await User.findOne({ clerkId: userId });
 
 if(existingUser){
    return res.status(200).json({ success: true, user: existingUser , message: "User already exists" });
 }

 const clerkUser = await clerkClient.users.getUser(userId);
 if(clerkUser){
    return res.status(200).json({ success: true, user: clerkUser , message: "User data fetched" });
 }
 const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0]?.emailAddress,
    firstname: clerkUser.firstName||"",
    lastname: clerkUser.lastName||"",
    username:clerkUser.emailAddresses[0]?.emailAddress.split('@')[0],
    profilePicture: clerkUser.imageUrl || "",
 }

 const user = await User.create(userData);

 return res.status(201).json({ success: true, user, message: "User synced/created  successfully" });
})

export const currentUser= asyncHandler(async(req, res) => {
 const { userId } = getAuth(req);

 const user = await User.findOne({ clerkId: userId });
 if(!user){
    return res.status(400).json({ success: false, message: "User not found" });
 }

 return res.status(200).json({ success: true, user });
})

export const followUser = asyncHandler(async(req, res) => {
const { userId } = getAuth(req);
const { targetUserId } = req.params;

// the person cannot follow themselves
if(userId === targetUserId){
  return res.status(400).json({
    success: false,
    message: "You cannot follow yourself"
  });
}

const currentUser = await User.findOne({ clerkId: userId });

const targetUser = await User.findById(targetUserId);

if(!targetUser){
    return res.status(400).json({ success: false, message: "Target user not found" });
}
// here the targetUserID is the direct id 
// currentUser._id is the current user's id
const isFollowing = currentUser.following.includes(targetUserId)
if(isFollowing){
 // unfollow the user 
 // deleted the targetUserId from the current user's following following array
 await User.findOneAndUpdate({
    clerkId: userId
 }, {
    $pull: { following: targetUserId }
 }, {
    new:true
 })
 // delete the current user's id from the targetUser's followers array
await User.findOneAndUpdate(targetUserId , {
    $pull: { followers: currentUser._id }
 }, {
    new:true
 })
  
}else{
    // follow the user
   await User.findOneAndUpdate(currentUser._id, {
    $push: { following: targetUserId }
 }, {
    new:true
 }) 

    // add the current user's id to the targetUser's followers array

    await User.findOneAndUpdate(targetUserId, {
    $push: { followers: currentUser._id }
 }, {
    new:true
 }) 

 // add the targetUserId to the current user's following array

 await User.findOneAndUpdate({
    clerkId: userId
 },{
    $push: { following: targetUserId }
 },{
    new:true
 }
)

// after following create a notification for the target user 

await Notification.create({
    from: currentUser._id,
    to: targetUserId,
    type: 'follow',
})

}

return res.status(200).json({
    success: true,
    message: isFollowing?"User unfollowed successfully": "User followed successfully"
 });



})