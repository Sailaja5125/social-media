import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js'; // Assuming you have a User model
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