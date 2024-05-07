import User from "../models/userModel.js";
import generateTokenAndSetCookies from "../utils/jsontoken.js";


const userCtrl = {
    getUsersForSidebar :  async (req, res) => {
        try {
           
            const loggedInUserId = req.user._id;
            // generateTokenAndSetCookies(loggedInUserId, res);
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    
            res.status(200).json(filteredUsers);
        } catch (error) {
            console.error("Error in getUsersForSidebar: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default userCtrl;

