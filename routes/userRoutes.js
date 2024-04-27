import express from "express";
const router = express.Router();
import userCtrl from "../controllers/userController.js";
import protectedRoute from "../middleware/protectRoute.js";

router.get("/", protectedRoute, userCtrl.getUsersForSidebar);

export default router;