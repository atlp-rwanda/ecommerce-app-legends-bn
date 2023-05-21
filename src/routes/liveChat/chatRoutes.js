import express from 'express';
import { CreatNewMessage,listAllMessages, clearAllMessages } from '../../controllers/liveChat/chatController';
import { auth } from '../../middleware/auth';
const chatRoutes = express.Router();
chatRoutes.get('/api/v1/chat/messages/all',listAllMessages);
chatRoutes.post('/api/v1/chat/messages/send',CreatNewMessage);
chatRoutes.delete('/api/v1/chat/messages/clear',auth('adimn'), clearAllMessages);
export default chatRoutes;