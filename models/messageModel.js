import mongoose from 'mongoose';

const messageScheme = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Message = mongoose.model('Message', messageScheme);

export default Message;