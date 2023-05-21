
import db from '../../database/models';
import { checkEmptyFields } from "../../utils/validations/handlingEmptyFields";
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
//handle sending messages to the chat
export const CreatNewMessage = asyncWrapper(async (req, res) => {
  const { message } = req.body;
  //checking if the message field has some text
  const errors = checkEmptyFields(req, res);
  if (!errors) {
    // Create the new message
    const Newmessage = await db.Chats.create({
      message: message,
      sender: req.body.sender,
    });
    // Broadcast the message to all connected clients
    res.status(201).json({
      status: req.t('success'),
      data: Newmessage,
      message:'sent sucessfully'
    });
  }
});
// getting all messages
export const listAllMessages = asyncWrapper(async (req, res) => {
  const allMessages = await db.Chats.findAll({});
  if(!allMessages){
    res.status(200).json({
      status: req.t('success'),
      data:  allMessages,
      message:'no message found'
    });
  }
  res.status(200).json({
    status: req.t('success'),
    data:  allMessages,
    message:'messages'
  });
});

export const clearAllMessages = asyncWrapper(async (req, res) => {
  const allMessages = await db.Chats.destroy({where:{}});
  if(!allMessages){
  return  res.status(200).json({
      status: req.t('success'),
      data:  allMessages,
      message:'no message found'
    });
  }
 return res.status(200).json({
    status: req.t('success'),
    data:  allMessages,
    message:'messages'
  });
}
);
