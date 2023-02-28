import {User} from '../models';
export const root = (req, res) => res.status(200).json({ message: 'Hello World!' });
//sending demo data to database to test if connection is established
export const createUser = async (req, res) => {
    try{
  const { email, password, firstName, lastName } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });
  res.status(201).json({message:'user created successfully'});
}catch(err){
    console.log(err.message);
}
};
