import User from "../models/userModel.js";
import parser from 'ua-parser-js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/jsontoken.js";

// Sign up route
const authCtrl = {
    signup: async (req, res) => {

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
            // const userAgentString = req.headers['user-agent'];

            // Parse user agent string to get browser, OS, and device information
            // const userAgentInfo = parser(userAgentString);

            const newUser = new User({
                fullName,
                userName,
                password: hashedPassword,
                gender,
                profilePicture: gender === 'male' ? boyProfilePicture : girlProfilePicture,
                // browser: userAgentInfo.browser.name,
                // operatingSystem: userAgentInfo.os.name,
                // userAgentInfo
            });



            if (newUser) {

                // Include user agent information in the response headers
                // res.setHeader('X-User-Agent', JSON.stringify(userAgentInfo));
                // Generate JWT token over here
                generateTokenAndSetCookies(newUser._id, res)
                await newUser.save();

                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    userName: newUser.userName,
                    gender: newUser.gender,
                    profilePicture: newUser.profilePicture,
                    // browser: newUser.browser, // Include browser info in the response
                    // operatingSystem: newUser.operatingSystem,
                    // userAgentInfo
                });



            } else {
                res.status(400).json({ error: "Invalid user data" })
            }



        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while signup" });

        }
    },

    // Login route
    login: async (req, res) => {

        try {

            const { userName, password } = req.body;

            const user = await User.findOne({ userName });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

            if (!user || !isPasswordCorrect) {
                res.status(400).json({ error: "Invalid user" });
            }


            generateTokenAndSetCookies(user._id, res);

            // const userAgentString = req.headers['user-agent'];
            // const userAgentInfo = parser(userAgentString);

            // Include user agent information in the response headers
            // res.setHeader('X-User-Agent', JSON.stringify(userAgentInfo));

            res.status(200).json({
                _id: user._id,
                // fullName: user.fullName,
                userName: user.userName,
                gender: user.gender,
                profilePicture: user.profilePicture,
                // userAgentInfo
            });


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while login" });
        }
    },

    // Logout route
    logout: (req, res) => {
        try {
            res.cookie('jwt', "", { maxAge: 0 })
            // res.clearCookie('jwt');
            res.status(200).json({ msg: "logout successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while logout" });
        }
    }
}

export default authCtrl;