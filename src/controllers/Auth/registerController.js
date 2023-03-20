import { user, role } from '../../models';
import sendEmail from '../../utils/sendEmail';
import { signToken, checkToken } from '../../utils/verifyPassword';
import { hashPassword } from '../../utils/hashpassword';

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  let validation = '';
  let isvalid = true;

  let valdationArr = ['firstname', 'lastname', 'email', 'phone', 'password'];

  valdationArr.forEach((key, val) => {
    if (
      req.body[key] == 'undefined' ||
      req.body[key] == '' ||
      req.body[key] == null
    ) {
     
      validation += key + ' ,';
      isvalid = false;
    }
  });

  if (!isvalid) {
    return res
      .status(400)
      .json({
        status: 'error',
        message: req.t('fill_out_all_fields', { validation }),
      });
  }

  // check for duplicate usernames in the db
  const duplicate = await user.findOne({ where: { email } });
  if (duplicate)
    return res.status(409).json({
      status: 'error',
      message: req.t('user_exixted_error'),
    }); // Conflict

  // encrypt the password
  const hashedPwd = await hashPassword(password);

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
    html: `<p> Thank you ${firstname} for registrting with us <a href="">the link </a> to sign in  </p>
    <br>
    <p> if not ${firstname} ${lastname} don't care this email </p>
    `,
  };
  let token = '';
  try {
    const result = await user.create(req.body);
    token = await signToken({ id: result.id, role: buyer.name });
    req.body.token = token;
    await checkToken(token);
    await sendEmail(emailContent);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }

  res
    .status(200)
    .json({ message: req.t('user_created_successfully'), status: 'ok', token });
};

export default { register };
