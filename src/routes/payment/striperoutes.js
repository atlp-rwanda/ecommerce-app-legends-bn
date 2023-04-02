import express from "express";
import {
    payment
} from "../../controllers/payment/stripeController";
 
const routes = express.Router();
routes.post('/payment', payment);

export default routes;
