import db from '../../database/models';
import speakeasy from 'speakeasy';
import JWT from 'jsonwebtoken';
import Bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { comparePassword, signToken } from '../../utils/verifyPassword';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import sendEmail from '../../utils/sendEmail';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
import {
  handleCookies,
  getCookieInfo,
  saveOTPusage,
} from '../../utils/handleCookies';
dotenv.config();
export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const error = checkEmptyFields(req.body);
  if (!error) {
    const user = await db.user.findOne({
      where: { email }
    });
    if (!user) {
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('wrong_email'),
      });
    }
    const is_active = user.status;
    if (is_active === 'inactive') {
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('user_disabled'),
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
    const token = await signToken({
      id: user.id,
      role: role.name,
      email: user.email,
    });
    req.body.token = token;
    switch (role.name) {
      case 'buyer':
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
        await sendEmail(emailContent);
        res.status(200).json({
          status: req.t('success'),
          user,
          token,
          role: role.name,
        });
        break;
      case 'vendor':
        //create two factor secrete
        const secret = await speakeasy.generateSecret({ length: 15 });
        //generate token
        const OTPtoken = await speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32',
          time: Math.floor(Date.now() / 1000 / 90),
          step: 90,
        });
        //create object to save 2fa token and corresponding
        const salt = await Bcrypt.genSalt(10);
        const hashedToken = await Bcrypt.hash(OTPtoken, salt);
        const mailOptions = {
          email: email,
          subject: 'verification code',
          html: 'Your verification code is: ' + OTPtoken,
        };
        //mailer sender implemantation
        await sendEmail(mailOptions);
        //creating mail options object
        const encodedToken = Buffer.from(hashedToken).toString('base64');
        await handleCookies(
          5,
          'onloginToken',
          encodedToken,
          'onloggingUserid',
          user.id,
          res
        );
        res.json({ message: req.t('code_sent') });
        break;
      default:
        res.status(200).json({
          status: req.t('success'),
          user,
          token,
          role: role.name,
        });
    }
  }
});
//verifiy vendor's verification codes grant access token to him
export const verifyOTP = asyncWrapper(async (req, res) => {
  const { verificationCode } = req.body;
  // checking existance of cookies
  if (req.headers.cookie) {
    const Cookiearray = req.headers.cookie.trim().split(';');
    const cookies = await getCookieInfo(Cookiearray);
    const hashedToken = cookies.onloginToken;
    let TimeUsed;
    cookies.timeUsed ? (TimeUsed = cookies.timeUsed) : (TimeUsed = 0);
    //compare incomming token with created
    const decodedToken = Buffer.from(hashedToken, 'base64').toString('utf-8');
    const incomingToken = verificationCode.trim();
    const isMatch = await comparePassword(incomingToken, decodedToken);
    if (isMatch) {
      if (TimeUsed > 0) {
        res.status(401).json({ message: req.t('code_have_been_login_used') });
      } else {
        TimeUsed++;
        saveOTPusage(4, 'timeUsed', TimeUsed, res);
        const user = await db.user.findOne({
          where: { id: cookies.onloggingUserid },
        });
        const role = await db.role.findOne({ where: { id: user.roleId } });
        const token = JWT.sign(
          {
            id: user.id,
            email: user.email,
            role: role.name,
          },
          process.env.APP_SECRET,
          { expiresIn: '3600s' }
        );
        res
          .status(200)
          .json({ message: req.t('verified'), user, token, role: role.name });
      }
    } else {
      res.status(500).json({ message: req.t('not_validated') });
    }
  } else {
    res.status(403).json({ message: req.t('login') });
  }
});
