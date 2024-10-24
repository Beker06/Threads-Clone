import express from "express";
import {
	signupUser,
    loginUser,
	logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
    getSuggestedUsers,
    freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.put("/freeze", protectRoute, freezeAccount);

export default router;