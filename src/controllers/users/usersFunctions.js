import db from '../../models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword, generatePassword } from '../../utils/hashpassword';
import { comparePassword, signToken } from '../../utils/verifyPassword';
import { user } from '../../models';
import dotenv from "dotenv";
dotenv.config();
let status = 'denied';
export const verifyEmail = async (req, res) => {
    const { email } = req.body;
    await db.user.findOne({ where: { email: email }})
    .then( async(user) => {
      // console.log(user);
    
     const token = await signToken({ id: user.id,email: email, reason: 'reset'});
     status = 'access';
     const emailContent = {
        email: email,
        token: token,
        subject: ` ${process.env.APP_NAME} , Password reset`,
        html: `<p> Hello ${user.lastname},,</p><br/>\
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
    if (status === 'access'){
    user.findOne({ where: { email: email }})
    .then( async(user) => {
      user.password = hashedPwd;
      return user.save();
    })
    .then(() => {
      status = 'denied';
      res.send({status: req.t('success'),message: req.t('password_updated')});
    })
  }else{
    res.send({status: req.t('fail'),message: req.t('auth_message')});
  }
  }


  export const resetPass = async (req, res) => {
    const { xpassword, npassword } = req.body;
    const email = req.user.email;
    console.log("This is what we have to deal with right now", req.user);
    const userr = await db.user.findOne({ where: { email: email } });
    console.log("This is where we are right now with right now", req.user);
    const verifyedPassword = await comparePassword(xpassword, userr.password);
    if (!verifyedPassword) {
      return res.status(401).json({
        status: req.t('fail'),
        message: req.t('wrong_password'),
      });
    }
    const hashedPwd = await hashPassword(npassword);
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

