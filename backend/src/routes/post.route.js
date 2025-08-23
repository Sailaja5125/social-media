import { Router } from "express";
import { getPosts , getPost , getUserPosts , createPost, likePost , deletePost} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/",getPosts);
router.get("/:postId" , getPost);
router.post("/user/:username",getUserPosts);

// protected routes
router.post("/",protectRoute,upload.single("image") ,createPost);
router.post("/:postId/like",protectRoute , likePost);
router.delete("/:postId",protectRoute,deletePost);
export default router;