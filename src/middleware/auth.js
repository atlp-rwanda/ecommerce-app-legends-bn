import dotenv from 'dotenv';
import { checkToken } from '../utils/verifyPassword';
import db from '../database/models';
import JWT from 'jsonwebtoken'
dotenv.config();

export const auth = (arg) => {
  return async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader)
      return res.status(403).json({
        status: req.t('fail'),
        message: req.t('unauthorized'),
      });
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    const result = await checkToken(token);
    if (!result)
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('unauthorized'),
      })
    const role = result?.user.role;
    req.user = result?.user;
    if (role === 'admin') return next();
    else if(arg.includes(role)) return next();
    else {
      if (role !== arg) {
        if(arg !== 'all'){
        return res.status(401).json({
          status: req.t('fail'),
          message: req.t('wrong_credentials'),
        });
      }
      }
      next();
    }
  };
};
export const authent = async (req, res, next) => {
    
    try {
      const token = req.params.token;
      const result = await checkToken(token);
      if(!result.user){
        res.json({
          message: req.t('auth_message')
      })
      }else{
        req.user= result
        next()
      }
          
  } catch (error) {
      res.json({
          message: req.t('auth_message')
      })
  }
};

export const isUserEnabled= async(req, res, next) => {
  const nodenv =process.env.NODENV;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.user.id;
  const user = await db.user.findOne({ where: { id: userId } });
  if(nodenv=='development'||nodenv=='production'){
  const userStatus = user?.status;
  if(!userStatus ||userStatus == "inactive"){
    return res.status(401).json({
      status: req.t('fail'),
      message: req.t('user_disabled'),
    });
  }
}
next();
}
