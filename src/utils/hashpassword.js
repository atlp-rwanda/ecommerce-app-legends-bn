import bcrypt from 'bcrypt';
import crypto from 'crypto';
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export function generatePassword() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(8);
  let password = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = randomBytes[i] % characters.length;
    password += characters[randomIndex];
  }

  return password;
}
