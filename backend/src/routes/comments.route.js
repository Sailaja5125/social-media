import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment , getComments , deleteComment} from '../controllers/comment.controller.js'
const router = Router();

// Create a comment
router.post("/:postId", protectRoute, createComment);

// Get all comments for a post
router.get("/post/:postId", getComments);

// Delete a comment
router.delete("/:commentId", protectRoute, deleteComment);


export default router;