import { Router } from "express";
import {
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.delete("/profile", authenticate, deleteProfile);

export default router;