import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    // console.log(token, 8);

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "devlopment",
        maxAge: 1000 * 60 * 60 * 24
    });

    // return token;

}

export default generateTokenAndSetCookies;
