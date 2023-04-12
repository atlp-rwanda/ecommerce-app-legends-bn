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
  saveOTPuser,
  saveOTPusage,
} from '../../utils/handleCookies';
dotenv.config();
export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const error = checkEmptyFields(req.body);
  if (!error) {
    const user = await db.user.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
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
      return res.status(404).json({
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
          data:user,
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
          html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
          <tbody><tr>
          <td style="padding-top:54px;padding-bottom:42px" align="center">
          <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
          </td>
          </tr>
          </tbody></table>
          <p class="m_73160151937089879size-16" style="Margin-top:0;Margin-bottom:0;font-size:16px;line-height:24px" lang="x-size-16"><strong><span style="color:#000000">Congratulations for comming back our estemmed vendors! </span></strong></p><p style="Margin-top:20px;Margin-bottom:0"><span style="color:#000000">You are in safe hands.</span></p>
          <p style="Margin-top:10px;Margin-bottom:0"><span style="color:#000000">Here at our ecommerce we have extensive experience in connecting customers to businesses.</span></p>
          <p style="Margin-top:20px;Margin-bottom:20px"><span style="color:#000000">Thank you for sign in the system, kindly find your verification code below </span></p>
          
          <p style="Margin-top:0px;Margin-bottom:10px"><span style="color:#000000">log into your account with these credentials</span></p>
          <div style="margin:0%;background:#fcfcfc;padding:1% 2%">
          <p><h4>Your verification code is: ${OTPtoken}</h6></p>
          </div> 
          <h3>Best regards,</h3>
          <h5><i>E-commerce ATLP-Legends project team</i></h5>    
          `,
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
          data:user,
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
        const token = await signToken({
          id: user.id,
          role: role.name,
          email: user.email,
        });
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
