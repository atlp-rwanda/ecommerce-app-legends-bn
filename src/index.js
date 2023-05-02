import express from 'express';
import rootRouter from './routes/root';
import adminRouter from './routes/users/adminRoutes';
import userAuthRoutes from './routes/users/userRoutes';
import google_auth from './routes/users/google_oauth.routes'
import vendorRouter from './routes/users/vendorRoutes';
import categoryRoutes from './routes/products/category'
import productRoutes from './routes/products/productsRoutes'
import wishlistRoutes from './routes/products/wishlist';
import buyerRoutes from './routes/products/buyer.routes'
import couponRoutes from './routes/coupon/couponRoutes';
import docs from './docs/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import db from './database/models/index';
import CartRoutes from './routes/shoppingCart/shoppingCartRoutes';
import chatRoutes from './routes/liveChat/chatRoutes';
import { origin } from './middleware/x-originConfig';
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
      prefix: '{{',
      suffix: '}}'
    }
  });
const app = express();
app.use(express.json());
app.use(middleware.handle(i18next));
app.use(origin);
app.use(cors({ origin:  [process.env.HOSTED_DOMAIN ,process.env.LOCAL_DOMAIN], credentials: true }));
// routes
app.use('/', rootRouter);
app.use(docs);
app.use(CartRoutes);
app.use(adminRouter);
app.use(vendorRouter);
app.use('/api/v1', userAuthRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use(productRoutes);
app.use(google_auth)
app.use(wishlistRoutes);
app.use(chatRoutes);
app.use('/api/v1/products',buyerRoutes)


app.all('*', (req, res) => {
  res.status(404).json({ error: req.t('404_error') });
});

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: true
});
// listening events using socket.io instance
io.on("connection", (socket) => {
  console.log("A client has connected");
  //notifications events
  socket.on("notification", (data) => {
    io.emit("notification", data);
  });
  //lesting to chats events
  
   socket.on('disconnect', () => {
     console.log('User disconnected');
   });

   socket.on('chat message', (msg) => {
     console.log('message: ' + msg);
     io.emit('chat message', { name: socket.name, message: msg });
   });

   socket.on('user joined', (name) => {
     console.log(`${name} has joined the chat`);
     socket.name = name;
     io.emit('user joined', name);
   });
 });
db.dbConnection;
db.sequelize.sync({ force: false }).then(async () => {
  console.log('DB synced');
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
