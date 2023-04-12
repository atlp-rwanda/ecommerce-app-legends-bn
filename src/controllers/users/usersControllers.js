import db from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword } from '../../utils/hashpassword';
import { comparePassword, signToken } from '../../utils/verifyPassword';
import emitter from '../../events/notifications';
import bcrypt from 'bcrypt';
import cron from 'node-cron';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
dotenv.config();
let status = 'denied';
export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  await db.user
    .findOne({ where: { email: email } })
    .then(async (user) => {
      const token = await signToken({
        id: user.id,
        email: email,
        reason: 'reset',
      });
      status = 'access';
      const emailContent = {
        email: email,
        token: token,
        subject: ` ${process.env.APP_NAME} , Password reset`,
        html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
        <tbody><tr>
        <td style="padding-top:54px;padding-bottom:42px" align="center">
        <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
        </td>
        </tr>
        </tbody></table>
        <p> Hello ${user.lastname},,</p><br/>\
        <p>http:/localhost:${process.env.PORT}/api/v1/password/${token}</p><br/>\
        <h4>If you want to reset your password then click on below link </h4><br/>\
        <a href="http:/localhost:${process.env.PORT}/api/v1/password/${token}">Click here</a>
        <h3>Best regards,</h3>
        <h5><i>E-commerce ATLP-Legends project team</i></h5>
        `,
      };

      // Send the email
      await sendEmail(emailContent, req, res);
    })

    .catch((error) => {
      console.log(error);
      res.status(404).json({
        status: req.t('fail'),
        message: req.t('email_fail'),
      });
    });
};
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const hashedPwd = await hashPassword(password);
  const u = req.user;
  const email = u.user.email;
  if (status === 'access') {
    db.user
      .findOne({ where: { email: email } })
      .then(async (user) => {
        user.password = hashedPwd;
        return user.save();
      })
      .then(() => {
        status = 'denied';
        res.send({
          status: req.t('success'),
          message: req.t('password_updated'),
        });
      });
  } else {
    res.send({ status: req.t('fail'), message: req.t('auth_message') });
  }
};

export const resetPass = async (req, res) => {
  const { xpassword, npassword } = req.body;
  const email = req.user.email;
  const userr = await db.user.findOne({ where: { email: email } });
  const verifyedPassword = await comparePassword(xpassword, userr.password);
  if (!verifyedPassword) {
    return res.status(401).json({
      status: req.t('fail'),
      message: req.t('wrong_password'),
    });
  }
  const hashedPwd = await hashPassword(npassword);
  db.user
    .findOne({ where: { email: email } })
    .then(async (user) => {
      user.password = hashedPwd;
      return user.save();
    })
    .then(() => {
      res.send({
        status: req.t('success'),
        message: req.t('password_updated'),
      });
    });
};

const updatedPassword = async (userId) => {
  const user = await db.user.findByPk(userId);
  user.update({ lastPasswordUpdate: new Date() });
};

export const updatePassword = asyncWrapper(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.user.id;
  const user = await db.user.findOne({ where: { id: userId } });
  const existingUserPassword = user.password;
  const { existingPassword, newPassword } = req.body;

  const isPasswordCorrect = await bcrypt.compare(existingPassword, existingUserPassword);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      status: req.t('fail'),
      message: req.t('existing_password'),
    });
  }
  const hashedPwd = await hashPassword(newPassword);
  user.update({ password: hashedPwd });
  updatedPassword(userId);

  return res.status(200).json({
    status: req.t('success'),
    message: req.t('password_updated'),
  });
});

cron.schedule('30 17 * * *', async () => {
  const users = await db.user.findAll();
  for (const allUsers of users) {
    const lastUpdate = new Date(allUsers.lastPasswordUpdate);
    const currentTime = new Date();
    const timeDiffInDays = Math.round(
      (currentTime - lastUpdate) / (1000 * 60 * 60 * 24)
    );
    if (timeDiffInDays >= 365) {
      emitter.emit('updatePassword', allUsers);
    }
  }
});