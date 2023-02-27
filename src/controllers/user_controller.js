import { User } from '../models';
export const createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
  
    const newUser = await User.create({
      firstName,
      lastName,
      email
    });
  
    res.status(201).json({
      status: "success",
      message:'user created successfully',
      data: newUser
    });
  }
  


