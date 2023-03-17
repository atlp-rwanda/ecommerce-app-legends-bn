import dotenv from 'dotenv';
import { checkToken } from '../utils/verifyPassword';
dotenv.config();

export const auth = (arg) => {
  return async (req, res, next) => {
    console.log('here')
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader)
      return res.status(403).json({
        status: 'failed',
        message: 'Access denied',
      });
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    const result = await checkToken(token);
    if (!result)
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized, invalid token',
      })
    const role = result?.user.role;
    req.user = result?.user;
    if (role === 'admin') return next();
    else {
      if (role !== arg) {
        console.log(role)
        return res.status(401).json({
          status: 'failed',
          message: 'Access dineid, provide correct credentials',
        });
      }
      next();
    }
  };
};

export const accessCookie = async (req, res) => {
  let hashedToken;

  //  if (req.headers.cookie) {
  //    const Cookiearray = req.headers.cookie.trim().split(';');
  //    const obj = {};
  //    //get saved token from local storage
  //    for (let i = 0; i < Cookiearray.length; i++) {
  //      const parts = Cookiearray[i].split('=');
  //      const key = parts[0].trim(); // Trim the key
  //      const value = parts[1].trim().replace(/=/g, ':');
  //      obj[key] = value;
  //    }
  //    hashedToken = obj.token;
  //   }
  // return hashedToken;
};
