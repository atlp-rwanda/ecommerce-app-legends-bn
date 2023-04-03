import db from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword } from '../../utils/hashpassword';
import { comparePassword, signToken } from '../../utils/verifyPassword';
import dotenv from 'dotenv';
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
      res.json({
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