import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
export const signToken = async (user) => {
  let expires = process.env.JWT_EXPIRES_IN;
  if(user.reason === 'reset'){
    expires = process.env.PASS_EXPIRES_IN;
  }
  const result = await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
  return result;
};

export const checkToken = async (token) => {
 try {
   const result = await jwt.verify(token, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRES_IN,
   });
   return result;
 } catch (error) {
    return false;
 }
};
