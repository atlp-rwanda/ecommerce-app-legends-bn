import { user } from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

const getUserById = async (id, res, message) => {
  const existingUser = await user.findByPk(id);
  if (!existingUser) {
    return res.status(404).json({ status: 'fail', message });
  }
  return existingUser;
};

const sendStatusChangeEmail = async (existingUser, subject, message) => {
  const sendemailOpt = {
    email: existingUser.email,
    subject,
    html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
        <tbody><tr>
        <td style="padding-top:54px;padding-bottom:42px" align="center">
        <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
        </td>
        </tr>
        </tbody></table>
        <p> Dear <h2> ${existingUser.firstname} </h2> ${message}</p>
        
        <p>If you have any further questions or concerns, please do not hesitate to contact us. <a href="mailto:mwanafunzifabrice@gmail.com">CONTACT US</a>.</p>

        <p><i>Thank you for choosing our website, and we look forward to your continued use of our services.</i></p>

        <h3>Best regards,</h3>
        <h5><i>E-commerce ATLP-Legends project team</i></h5>
        `,
  };
  await sendEmail(sendemailOpt);
};

export const disableUser = asyncWrapper(async (req, res, next) => {
  const existingUser = await getUserById(req.params.id, res, req.t('user_not_found'));

  if (existingUser.status === 'inactive') {
    return res
      .status(403)
      .json({ status: 'fail', message: req.t('already_disabled') });
  }
  await sendStatusChangeEmail(
    existingUser,
    'Your account disabled',
    'We regret to inform you that your account on our website has been disabled due to some illegal activities. Our team has conducted a thorough investigation and found evidence of wrongdoing, which is against our policies. As a result, we had to disable your account to protect the security and integrity of our platform. We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or behavior. Please note that you will no longer be able to access your account or any associated services.'
  );
  existingUser.status = 'inactive';
  await existingUser.save();
  res
    .status(200)
    .json({ status: 'success', message: req.t('disabled_successfully') });
});

export const enableUser = asyncWrapper(async (req, res, next) => {
  const existingUser = await getUserById(req.params.id, res, req.t('user_not_found'));

  if (existingUser.status === 'active') {
    return res
      .status(403)
      .json({ status: 'fail', message: req.t('already_enabled') });
    }
    await sendStatusChangeEmail(
    existingUser,
    'Your account enabled',
    'We are pleased to inform you that your account on our website has been reactivated. Our team has reviewed your account and found that there was no evidence of any illegal activities. We apologize for any inconvenience this may have caused, and we are committed to providing a safe and secure platform for all our users. Please note that you can now access your account and all associated services as usual.'
    );
    existingUser.status = 'active';
    await existingUser.save();
    res
    .status(200)
    .json({ status: 'success', message: req.t('enabled_successfully') });
    });
    
    
    
    
