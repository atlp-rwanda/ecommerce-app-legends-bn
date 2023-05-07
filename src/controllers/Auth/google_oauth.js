import db from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import dotenv from 'dotenv'
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

dotenv.config()
export const loginWithGoogle = asyncWrapper(async (req, res) => {
    const { user, token } = req.user;
    const existingUser = await db.user.findOne({ where: { email: user.email } });
    if(!existingUser){
      res.status(302).json({status:"fail", message: req.t('user_email_not_found')})
      return
    }
    const is_active = existingUser.status;
    if(is_active === 'inactive'){
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('user_disabled'),
      });
    }
    if (existingUser) {
      const role = await db.role.findOne({ where: { id: existingUser.roleId } });
      req.body.role = role.name;
      res.set('Authorization', `Bearer ${token}`);
      const uniqueId = Math.random().toString(36).substr(2, 9); // generate a random string for the unique identifier
      const emailOptions = {
        email:user.email,
        subject: ` Welcome to ${process.env.APP_NAME}`,
        html: ` <table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
        <tbody><tr>
        <td style="padding-top:54px;padding-bottom:42px" align="center">
        <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
        </td>
        </tr>
        </tbody></table>
        <p> Thank you ${existingUser.firstname} for logging into our app us keep enjoying our services </p>
      <br>
      <p> Welcome ${existingUser.firstname} ${existingUser.lastname}.</p>
      <p>Thank you for choosing ${process.env.APP_NAME}! We are excited to have you on board and look forward to providing you with top-quality service.</p>
      <p>If you have any questions or concerns, please do not hesitate to reach out to our support team.</p>
      <br>
      <p>you are recieving this email because your subscribed to our app</p>
      <h3>Best regards,</h3>
      <h5><i>E-commerce ATLP-Legends project team</i></h5>
      `
      };
      if (req.body.role === 'buyer') {
        await sendEmail(emailOptions);
      }
      return res.redirect(`${process.env.FRONT_END_URL}/login?token=${token}&role=${role.name}&username=${existingUser.firstname}`);
        }
});
