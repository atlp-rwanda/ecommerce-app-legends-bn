import { user, role } from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { signToken, checkToken } from '../../utils/verifyPassword';
import { hashPassword } from '../../utils/hashpassword';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
// eslint-disable-next-line consistent-return
const register = asyncWrapper(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const isSomeFieldEmpty = checkEmptyFields(req, res);
  if(!isSomeFieldEmpty){
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
    const result = await user.create(req.body);
    token = await signToken({ id: result.id, role: buyer.name, email: email});
    req.body.token = token;
    await checkToken(token);
    await sendEmail(emailContent);
  res
    .status(200)
    .json({ message: req.t('user_created_successfully'), status: 'ok', token: token });
}
});

export default { register };
