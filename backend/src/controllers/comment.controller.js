import asyncHandler from "express-async-handler";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate("user", "username firstname lastname profilePicture")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if(comment.trim()==="" || !content){
    return res.status(404).json({ error: "Bhai atleast write a text comment daa !!" });
  }
  if (!user || !post) {
    return res.status(404).json({ error: "User or post not found" });
  }

  const comment = await Comment.create({
    content,
    user: user._id,
    post: post._id
  });

  await Post.findByIdAndUpdate(postId , {
    $push:{ comments: comment._id}
  });

  if(post.user.toString()!== user._id.toString()){
    await Notification.create({
        from:user._id,
        to:post.user,
        type:"comment",
        post:postId,
        comment:comment._id
    })
  }

  res.status(201).json({ success: true, comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { commentId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const comment = await Comment.findById(commentId);

  if (!user || !comment) {
    return res.status(404).json({ error: "User or comment not found" });
  }

  // Only the comment owner or post owner can delete
  const post = await Post.findById(comment.post);
  const isOwner = comment.user.toString() === user._id.toString();
  // post owner is allowed to delete the comment
  const isPostOwner = post.user.toString() === user._id.toString();

  if (!isOwner) {
    return res.status(403).json({ error: "Not authorized to delete this comment" });
  }

  // remove from the post
  await Post.findByIdAndUpdate({
    $pull:{ comments:commentId }
  });

  // delete the comment
  await Comment.findByIdAndUpdate(commentId)

  res.status(200).json({ success: true, message: "Comment deleted successfully" });
});
