import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
    
        await Promise.all([newMessage.save(),conversation.save() ])

        res.status(201).json({
            newMessage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while send message" });
    }
}

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 
        
        //.populate("messages"): Once the conversation document is found, this part of the function populates the messages field of the conversation document with actual message documents. The messages field likely contains references (or IDs) to the actual message documents stored in a separate collection. By using .populate("messages"), the function retrieves the actual message documents associated with the conversation.

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Something went wrong while get message" });
	}
};