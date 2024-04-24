import User from "../models/userModel.js";
import parser from 'ua-parser-js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/jonstoken.js";

// Sign up route
export const signup = async (req, res) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ userName })

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        // Extract user agent string from request headers
        const userAgentString = req.headers['user-agent'];

        // Parse user agent string to get browser, OS, and device information
        const userAgentInfo = parser(userAgentString);

        // Log the parsed user agent info
        // console.log('Browser:', userAgentInfo.browser);
        // console.log('Operating System:', userAgentInfo.os);
        // console.log('Device:', userAgentInfo.device);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'male' ? boyProfilePicture : girlProfilePicture,
            browser: userAgentInfo.browser.name,
            operatingSystem: userAgentInfo.os.name,
            userAgentInfo
        });

        await newUser.save();

        if (newUser) {

            // Generate JWT token over here
            generateTokenAndSetCookies(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture,
                browser: newUser.browser, // Include browser info in the response
                operatingSystem: newUser.operatingSystem,
                userAgentInfo
            });
    

          
        } else {
            res.status(400).json({error: "Invalid user data"})
        }

  

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while signup" });

    }

};

// Login route
export const login = async (req, res) => {

    try {

        const {userName, password} = req.body;

        const user = await User.findOne({ userName });
        const isPasswordCurrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCurrect) {
            res.status(400).json({error: "Invalid user"});
        }


        generateTokenAndSetCookies(user.id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            gender: user.gender,
            profilePicture: user.profilePicture,
            browser: user.browser, // Include browser info in the response
            operatingSystem: user.operatingSystem,
            userAgentInfo: user.userAgentInfo,
            userAgentInfo
        });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while login" });
    }

    res.send("User authenticated successfully");
};

// Logout route
export const logout = async (req, res) => {
    // Logic to invalidate the user's session or access token
    // Example: invalidateSession(req.sessionId)
    res.send("User logged out successfully");
}

// Forgot password route
export const forgot = async (req, res) => {
    // Logic to initiate the password reset process and send instructions to the user
    // Example: initiatePasswordReset(req.body.email)
    res.send("Password reset instructions sent successfully");
};

// Reset password route
export const reset = async (req, res) => {
    // Logic to reset the user's password based on the reset token provided in the request
    // Example: resetPassword(req.body.token, req.body.newPassword)
    res.send("Password reset successfully");
};