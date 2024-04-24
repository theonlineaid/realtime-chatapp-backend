import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    profilePicture: {
        type: String,
        required: false,
        default: '',
    },
    browser: {
        type: String,
        required: false,
    },
    operatingSystem: {
        type: String,
        required: false,
    },
    userAgentInfo: {
        type: Object, // Store the entire userAgentInfo object
        required: false,
    }
});

const User = mongoose.model('User', userSchema);

export default User;
