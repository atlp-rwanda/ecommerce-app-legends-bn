import dotenv from 'dotenv';
import { checkToken } from './verifyPassword';
dotenv.config();

export const authAdmin = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.status(403).json({
    status: 'failed',
    message: 'Access dineid',
  });
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  const result = await checkToken(token);
  const role = result.user.role;
  if (!result) return res.status(401).json({
    status: 'failed',
    message: 'Unauthorized, invalid token',
  });
  if (role === 'admin') {
    next();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Access dineid, provide correct credentials',
    });
  }
};

export const authVendor = async (req, res, next) => {
  const token = await accessCookie(req, res);
  const result = await checkToken(token);
  if (!result)
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized, invalid token',
    });
  if (result.role === 'vendor') {
    next();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Access dineid, provide correct credentials',
    });
  }
};

export const authBuyer = async (req, res, next) => {
  //  const token = await accessCookie(req, res);
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.status(403).json({
    status: 'failed',
    message: 'Access dineid',
  });
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  const result = await checkToken(token);
  if (!result)
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized, invalid token',
    });
  if (result.role === 'buyer') {
    next();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Access dineid, provide correct credentials',
    });
  }
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
  return hashedToken;
};
