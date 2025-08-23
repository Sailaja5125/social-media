import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
const router = Router();

router.get('/',protectRoute, getNotification);
router.get('/:notificationId',protectRoute, deleteNotification);

export default router;