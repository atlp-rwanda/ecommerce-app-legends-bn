import dotenv from 'dotenv';
dotenv.config();
export const origin=(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', [process.env.HOSTED_DOMAIN,process.env.LOCAL_DOMAIN]); // Replace with your React app domain
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }