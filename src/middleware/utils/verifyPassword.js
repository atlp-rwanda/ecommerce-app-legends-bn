import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
export const signToken = async (user) => {
  const result = await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.c,
  });
  return result;
};

export const checkToken = async (token) => {
  const result = await jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return result;
};
