import { comparePassword } from '../middleware/hashPassword';
import db from '../models'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;
    if (email && password) {
      user = await db.user.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const verifiedPassword = await comparePassword(password, user.password);
      if (!verifiedPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else if (req.user && req.user.user) {
      user = req.user.user;
    } else {
      return res.status(400).json({ message: 'Missing credentials' });
    }
    const role = await db.role.findOne({ where: { id: user.roleId } });
    req.body.role = role.name;
    const token = await signToken({ id: user.id, role: role.name });
    res.cookie('token', token, {
      expiresIn: new Date(
        Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { user, token } = req.user;
    const existingUser = await db.user.findOne({ where: { email: user.email } });
    if(!existingUser){
      res.status(404).json({status:"fail", message: "user email not found"})
      return
    }
    if (existingUser) {
      const role = await db.role.findOne({ where: { id: existingUser.roleId } });
      req.body.role = role.name;
      res.cookie('token', token, {
        expiresIn: new Date(
          Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return res.status(200).json({ user, token });
    }
    // const newUser = await db.user.create({
    //   email:user.email,
    //   password: null,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   roleId: 2, // default role is "user"
    //   });
      // req.body.role = 'user';
      // const role = await db.role.findOne({ where: { id: newUser.roleId } });
      // const newToken = await signToken({ id: newUser.id, role: role.name });
      // res.cookie('token', newToken, {
      // expiresIn: new Date(
      // Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      // ),
      // httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      // });
      return res.status(200).json({ user: newUser, token: newToken });
      } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
      }
      };