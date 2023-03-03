import db from '../models';
import { comparePassword, signToken } from '../middleware/utils/verifyPassword';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const verifyedPassword = await comparePassword(password, user.password);
    const role = await db.role.findOne({ where: { id: user.roleId } });
    req.body.role = role.name;
    if (!verifyedPassword)
      return res.status(401).json({ message: 'Invalid credentials' });
    const token = await signToken({ id: user.id, role: role.name });
    req.body.token = token;
    // res.cookie('token', token, {
    //   expiresIn: new Date(
    //     Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // });
    res.status(200).json({
      status: 'success',
      user,
      token,
      role: role.name,
    });
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      message: err.errors ? err.errors[0].message : err.message,
    });
  }
};
