import db from '../../models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword, generatePassword } from '../../utils/hashpassword';
import { signToken } from '../../utils/verifyPassword';
import { user } from '../../models';
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = async (req, res) => {
    const { email } = req.body;
    await db.user.findOne({ where: { email: email }})
    .then( async(user) => {
      // console.log(user);
    
     const token = await signToken({ id: user.id,email: email});
    
     const emailContent = {
        email: email,
        token: token,
        subject: ` ${process.env.APP_NAME} , Password reset`,
        html: `<p> Hello ${user.firstname} ${user.lastname},,</p><br/>\
        <p>http:/localhost:${process.env.PORT}/api/v1/password/${token}</p><br/>\
        <h4>If you want to reset your password then click on below link </h4><br/>\
        <a href="http:/localhost:${process.env.PORT}/api/v1/password/${token}">Click here</a>`,
      };
   
    // Send the email
     await sendEmail(emailContent,req,res);
   

    })
    
  .catch(error => {
    console.log(error);
    res.json({
      status: req.t('fail'),
      message: req.t('email_fail')
    });
  });
  }
  export const resetPassword = async (req, res) => {
    const { password } = req.body;
    const hashedPwd = await hashPassword(password);
    const u= req.user;
    const email= u.user.email;
    console.log(email);
    user.findOne({ where: { email: email }})
    .then( async(user) => {
      user.password = hashedPwd;
      return user.save();
    })
    .then(() => {
      res.send({status: req.t('success'),message: req.t('password_updated')});
    })
  }




