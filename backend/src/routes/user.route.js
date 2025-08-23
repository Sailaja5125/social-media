import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { updateProfile, syncUser, currentUser , followUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/profile/:username',getUserProfile);

router.put("/profile",protectRoute,updateProfile)
router.get("/me",protectRoute,currentUser);
// Basically it adds the user to the mongoDB database if it doesn't exist
router.post("/sync",protectRoute,syncUser);
router.post("/follow/:targetUserId" , protectRoute , followUser);
export default router;