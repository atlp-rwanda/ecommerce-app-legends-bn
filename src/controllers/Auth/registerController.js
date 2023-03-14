import bcrypt from 'bcrypt';
import { user, role } from '../../models';
import sendEmail from '../../utils/sendEmail';

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  let validation = '';
  let isvalid = true;

  let valdationArr = ["firstname", "lastname", "email", "phone", "password"]

  valdationArr.forEach((key,val) => {
    if (req.body[key] == "undefined" || req.body[key] == "" || req.body[key] == null) {
      console.log(key);
      validation += key + ' ,';
      isvalid = false
    }
  });

  if (!isvalid) {
    return res
      .status(400)
      .json({ status: 'error', message: req.t('fill_out_all_fields', {validation}) });
  }

  // check for duplicate usernames in the db
  const duplicate = await user.findOne({ where: { email } });
  if (duplicate)
    return res.status(409).json({
      status: 'error',
      message: req.t('user_exixted_error'),
    }); // Conflict

  // encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);

  let buyer = await role.findOne({ where: { name: 'buyer' } });

  if (!buyer) {
    buyer = await role.create({
      name: 'buyer',
    });
  }

  req.body['roleId'] = buyer.id;
  req.body['password'] = hashedPwd;

  const emailContent = {
    email: email,
    subject: ` Welcome to <b> ${process.env.APP_NAME} </b>`,
    html: `<p> Thank you ${firstname} for registrting with us <a href="www.google.com">the link </a> to sign in  </p>
    <br>
    <p> if not ${firstname} ${lastname} don,t care this email </p>
    `,
  };
  try {
    const result = user.create(req.body);
    await sendEmail(emailContent);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }

  res
    .status(201)
    .json({ message: req.t('user_created_successfully'), status: 'ok' });
};

export default { register };
