import bcrypt from 'bcrypt';
import { User } from '../../models';
import sendEmail from '../../utils/sendEmail';

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  if (!firstname || !lastname || !password || !email || !phone)
    return res
      .status(400)
      .json({ status: 'error', message: req.t('fill_out_all_fields') });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ where: { email } });
  if (duplicate)
    return res.status(409).json({
      status: 'error',
      message: req.t('user_exixted_error'),
    }); // Conflict

  // encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);

  req.body['roleId'] = req.body['roleId'] ? req.body['roleId'] : 1;
  req.body['password'] = hashedPwd;

  const emailContent = {
    email: email,
    subject: ` Welcome to <b> ${process.env.APP_NAME} </b>`,
    html: `<p> Thank you ${firstname} for registrting with us <a href="www.google.com">the link </a> to sign in  </p>
    <br>
    <p> if not ${firstname} ${lastname} don,t care this email </p>
    `,
  };

  
  const result = User.create({...req.body});
  
  process.env.NODE_ENV!='test' ? await sendEmail(emailContent) : console.log('dev dev');

  res.status(201).json({ result, message: req.t('user_created_successfully'), status: 'ok' });
};

export default { register };
