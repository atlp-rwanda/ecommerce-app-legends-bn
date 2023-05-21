import express from 'express';
import { getUreadNotifications, markAsRead} from '../../controllers/Auth/notificationsContrloller';

const notificationRouter = express.Router();

notificationRouter.get('/api/v1/unread/:userId', getUreadNotifications).patch('/api/v1/read/:userId', markAsRead);

export default notificationRouter;
