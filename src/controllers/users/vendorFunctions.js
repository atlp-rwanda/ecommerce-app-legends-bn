import db from '../../models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword, generatePassword } from '../../utils/hashpassword';
export const createVendor = async (req, res) => {
  //add admins
  try {
    const { firstname, lastname, email, phone, permissions } = req.body;
    const password = await generatePassword();
    const hashedPassword = await hashPassword(password);
    const newRole = await db.role.create({
      name: 'vendor',
    });
    await db.user.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      roleId: newRole.id,
    });
    const newPermission = await db.permission.create({
      name: permissions,
    });
    await db.rolePermission.create({
      roleId: newRole.id,
      permissionId: newPermission.id,
    });
    //sending email to the person
    const mail = {
      email,
      subject: 'complete your account registration',
      html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
<tbody><tr>
<td style="padding-top:54px;padding-bottom:42px" align="center">
<h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP project</h2>
</td>
</tr>
</tbody></table>
<p class="m_73160151937089879size-16" style="Margin-top:0;Margin-bottom:0;font-size:16px;line-height:24px" lang="x-size-16"><strong><span style="color:#000000">Congratulations on becoming one of our estemmed vendors. </span></strong></p><p style="Margin-top:20px;Margin-bottom:0"><span style="color:#000000">You are in safe hands.</span></p>
<p style="Margin-top:10px;Margin-bottom:0"><span style="color:#000000">Here atecommerce we have extensive experience in connecting customers to businesses.</span></p>
<p style="Margin-top:20px;Margin-bottom:20px"><span style="color:#000000">Thank you for recently registering for the e-commerce Website. To complete your e-commerce registration, please click the button below: </span></p>
<a href="jbkjbb/kok" style="margin:1% auto;border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;color: #ffffff !important;background-color: #0175db;font-family: Ubuntu,sans-serif;">Activate account
</a>
<p style="Margin-top:0px;Margin-bottom:10px"><span style="color:#000000">log into your account with these credentials</span></p>
<div style="margin:0%;background:#fcfcfc;padding:1% 2%">
<p style="text-decoration: none;">email:${email}</p>
<p>password:${password}</p>
</div>

      
`,
    };
    await sendEmail(mail);

    res.status(201).json({
      message: req.t('vendor_added_message'),
      status: req.t('success'),
    });
  } catch (err) {
    res.status(500).json({
      message: err.errors ? err.errors[0].message : err.message,
      status: 'failed',
    });
  }
};