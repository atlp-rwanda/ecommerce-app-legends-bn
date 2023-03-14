import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checkToken } from './verifyPassword';
dotenv.config();

  export const authAdmin = async (req, res, next) => {
    const token = await accessCookie(req, res)
    const result = await checkToken(token);
    if (!result)
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    if (result.role === 'admin') {
      next();
    }
   else {
      res.status(401).json({ message: "Unauthorized, you're not admin" });
    }
};
  
 export const authVendor = async (req, res, next) => {
   const token = await accessCookie(req, res);
   const result = await checkToken(token);
   if (!result)
     return res.status(401).json({ message: 'Unauthorized, invalid token' });
   if (result.role === 'vendor') {
     next();
   } else {
     res.status(401).json({ message: "Unauthorized, you're not admin" });
   }
};
 
 export const authBuyer = async (req, res, next) => {
   const token = await accessCookie(req, res);
   const result = await checkToken(token);
   if (!result)
     return res.status(401).json({ message: 'Unauthorized, invalid token' });
   if (result.role === 'buyer') {
     next();
   } else {
     res.status(401).json({ message: "Unauthorized, you're not admin" });
   }
 };

export const accessCookie = async (req, res) => {
   let hashedToken;
   if (req.headers.cookie) {
     const Cookiearray = req.headers.cookie.trim().split(';');
     const obj = {};
     //get saved token from local storage
     for (let i = 0; i < Cookiearray.length; i++) {
       const parts = Cookiearray[i].split('=');
       const key = parts[0].trim(); // Trim the key
       const value = parts[1].trim().replace(/=/g, ':');
       obj[key] = value;
     }
     hashedToken = obj.token;
    }
    return hashedToken;
}
