import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

 const sendEmail = async(reciever) =>{
    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const options = {
    from: process.env.GMAIL_USER,
    to: reciever.email,
    subject:reciever.subject,
    text: reciever.text,
    secure: true
}

     await transporter.sendMail(options, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

export default sendEmail