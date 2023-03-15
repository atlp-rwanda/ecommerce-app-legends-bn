import db from '../models';
import { comparePassword, signToken } from '../utils/verifyPassword';
import sendEmail from '../utils/sendEmail';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('wrong_email'),
      });
    }
    const { firstname, lastname } = user;
    const verifyedPassword = await comparePassword(password, user.password);
    const role = await db.role.findOne({ where: { id: user.roleId } });
    req.body.role = role.name;
    if (!verifyedPassword) {
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('wrong_password'),
      });
    }
    const token = await signToken({ id: user.id, role: role.name });
    req.body.token = token;

    const emailContent = {
      email: email,
      subject: ` Welcome to ${process.env.APP_NAME}`,
      html: `<p> Thank you ${firstname} for logging into our app us keep enjoying our services </p>
    <br>
    <p> Welcome ${firstname} ${lastname}.</p>
    <br>
    <p>you are recieving this email because your subscribed to our app</p>
    `,
    };
    if (role.name === 'buyer') {
      await sendEmail(emailContent);
    }
    // res.cookie('token', token, {
    //   expiresIn: new Date(
    //     Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // });
    res.status(200).json({
      status: req.t('success'),
      user,
      token,
      role: role.name,
    });
  } catch (err) {
    res.status(403).json({
      status: req.t('fail'),
      message: err.errors ? err.errors[0].message : err.message,
    });
  }
};
