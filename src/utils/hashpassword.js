import bcrypt from 'bcrypt';
 const hashPassword = async(password) => {
 const hashedPassword = await bcrypt.hash(password, 10);
 return hashedPassword
};
 
export default hashPassword