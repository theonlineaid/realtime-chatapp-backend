import Conversation from "../models/conversationModel.js";

export const sendMessage = async  (req, res) => {

   try {
    const {messege} = req.body;
    const {id} = req.params;
    const senderId  = req.user._id;

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, reciverId]
        }
    })

   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while send message" });
   }
}