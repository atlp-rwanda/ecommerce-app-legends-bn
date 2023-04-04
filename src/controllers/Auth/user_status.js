import { user } from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
export const disableUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const existingUser = await user.findByPk(userId);
  if (!existingUser) {
    return res
      .status(404)
      .json({ status: 'fail', message: req.t('user_not_found') });
  } else if (existingUser.status === 'inactive') {
    return res
      .status(403)
      .json({ status: 'fail', message: req.t('already_disabled') });
  }
  const sendemailOpt = {
    email: existingUser.email,
    subject: 'Your accont disabled',
    html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
        <tbody><tr>
        <td style="padding-top:54px;padding-bottom:42px" align="center">
        <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
        </td>
        </tr>
        </tbody></table>
        <p> Dear <h2> ${existingUser.firstname} </h2> We regret to inform you that your account on our website has been disabled due to some illegal activities.
         Our team has conducted a thorough investigation and found evidence of wrongdoing, which is against our policies.</p>
        
        <p>As a result, we had to disable your account to protect the security and integrity of our platform. 
        We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or behavior.</p>

        <p>Please note that you will no longer be able to access your account or any associated services. 
        If you have any questions or concerns about this decision, please feel free to contact us at <a href="mailto:mwanafunzifabrice@gmail.com">CONTACT US</a>.</p>

        <p><i>Thank you for your understanding and cooperation.</i></p>

        <h3>Best regards,</h3>
        <h5><i>E-commerce ATLP-Legends project team</i></h5>
        `,
  };
  await sendEmail(sendemailOpt);
  existingUser.status = 'inactive';
  res
    .status(200)
    .json({ status: 'success', message: req.t('disabled_successfully') });
  existingUser.save();
});

export const enableUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const existingUser = await user.findByPk(userId);

  if (!existingUser) {
    return res
      .status(404)
      .json({ status: 'fail', message: req.t('user_not_found') });
  } else if (existingUser.status === 'active') {
    return res
      .status(403)
      .json({ status: 'fail', message: req.t('already_enabled') });
  }
  const sendemailOpt = {
    email: existingUser.email,
    subject: 'Your accont disabled',
    html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
        <tbody><tr>
        <td style="padding-top:54px;padding-bottom:42px" align="center">
        <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
        </td>
        </tr>
        </tbody></table>
        <p> Dear <h2> ${existingUser.firstname} </h2> We hope this email finds you well. I am writing to inform you that your account has been successfully enabled.</p>
        
        <p>As you may be aware, your account was previously disabled, but we are pleased to inform you that it has now been reactivated. We apologize for any inconvenience this may have caused and are glad to have you back as an active member of our website.</p>

        <p>Please note that an email notification has been sent to your registered email address regarding the reactivation of your account. If you have any further questions or concerns, please do not hesitate to contact us. <a href="mailto:mwanafunzifabrice@gmail.com">CONTACT US</a>.</p>

        <p><i>Thank you for choosing our website, and we look forward to your continued use of our services.</i></p>

        <h3>Best regards,</h3>
        <h5><i>E-commerce ATLP-Legends project team</i></h5>
        `,
  };
  await sendEmail(sendemailOpt);
  existingUser.status = 'active';
  res
    .status(200)
    .json({ status: 'success', message: req.t('enabled_successfully') });
  existingUser.save();
});
