import { Chat } from "../model/chat.model.js";
import { Message } from "../model/message.model.js";
import { User } from "../model/user.model.js";

const allMessages = async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username email")
      .populate("reciever")
      .populate("chat");  
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message)
  }
};
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  
  if (!content || !chatId) {
    return res.sendStatus(400);
  }
  
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage)

    message = await message.populate("sender", "username pic");
    message = await message.populate("chat");
    message = await message.populate("reciever");

    message = await User.populate(message, {
      path: "chat.users",
      select: "username email",
    });
    
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message)
  }
};

export { allMessages, sendMessage };
