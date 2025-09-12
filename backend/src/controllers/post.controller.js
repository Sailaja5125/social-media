import asyncHandler from 'express-async-handler';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import { getAuth } from '@clerk/express';
import cloudinary from '../config/cloudinary.js';
import Notification from '../models/notification.model.js';
import Comment from '../models/comment.model.js'

export const getPosts = asyncHandler(async(req , res)=>{
    const posts = await Post.find()
    .sort({
        createdAt:-1
    })
    .populate('user', 'username firstName lastName profileImage')
    .populate({
        path:'comments',
        populate:{
            path:'user',
            select:'username firstName lastName profileImage'
        }
    })

    return res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        posts
    })
})

export const getPost = asyncHandler(async(req, res) => {
 const { postId } = req.params;
 const post = await Post.findById(postId).populate("user" , "username firstName lastName profileImage").populate({
    path:'comments',
    populate:{
        path:"user",
        select:"username firstName lastName profileImage"
    }
 })
 if(!post){
    return res.status(404).json({
        error:"Post not found"
    });
 }

 return res.status(200).json({post});

})

export const getUserPosts = asyncHandler(async(req , res)=>{
    const { username } = req.params;

    const user = await User.findOne({username});

    const post = await Post.findOne({
        user:user._id
    }).sort({created:-1}).populate("user" , "username firstName lastName profileImage").populate({
        path:"comments",
        populate:{
            path:"user",
            select:"username firstName lastName profileImage",
        }
    })

    return res.status(400).json({
        post
    })
})

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res.status(400).json({
      error: "Post must contain either text or image"
    });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  let imageUpload = "";
  if (imageFile) {
    try {
      const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
        "base64"
      )}`;

      
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, corp: "limit" },
          { quality: "auto" },
          { format: "auto" }
        ]
      });
      imageUpload = result.secure_url;
    } catch (uploadError) {
      console.log("cloudinary upload error",uploadError);
      return res.status(400).json({
        error: "Image upload failed"
      });
    }
  }

  const newPost = await Post.create({
    user: user._id,
    content,
    image: imageUpload
  });

  
  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: newPost
  });
});

export const likePost = asyncHandler(async(req , res)=>{
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const user = await User.findOne({clerkId:userId});
    const post = await Post.findById(postId);

    if(!user || !post) return res.status(404).json({
        error:"User or post not found"
    })
    const isLiked = post.likes.includes(user._id);
    
    if(isLiked){
        await Post.findByIdAndUpdate(postId ,{
            $pull:{
                likes:user._id
            }
        });
    }else{
        await Post.findByIdAndUpdate(postId , {
            $push:{
                likes:user._id
            }
        })
    }
// if the post user is himself not liking his post
    if(post.user.toString() !== user._id.toString()){
        await Notification.create({
            from:user._id,
            to:post.user,
            type:"like",
            post:postId
        })
    }

    return res.status(200).json({ success: true, message: "Post like status updated" });

})

export const deletePost = asyncHandler(async(req , res)=>{
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const user = await User.findOne({clerkId:userId});
    const post = await Post.findById(postId);

 if (!user || !post) {
    return res.status(404).json({
      error: "User or post not found"
    });
  }
// Check if the user is the owner of the post
  if (post.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      error: "You are not authorized to delete this post"
    });
  }
  
  // delete all the comments
  await Comment.deleteMany({post:postId});

// delete the post
  await Post.findByIdAndDelete(postId);

  res.status(200).json({message:"Post deleted successfully"});

})