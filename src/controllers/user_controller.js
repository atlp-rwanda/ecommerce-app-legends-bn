import { User } from '../models';
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
  });

  res.status(201).json({
    status: 'success',
    message: 'user created successfully',
    data: newUser,
  });
};

const getUser = async (req, res) => {
  const users = await User.findAll({});
  return res.status(200).json({ users, message: 'ok' });
};

export default { createUser, getUser };
