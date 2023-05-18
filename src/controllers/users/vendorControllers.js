import db from '../../database/models';
import sendEmail from '../../utils/sendEmail';
import { hashPassword, generatePassword } from '../../utils/hashpassword';
import dotenv from 'dotenv';
dotenv.config();
export const createVendor = async (req, res) => {
  //add admins
  try {
    const { firstname, lastname, email, phone, permissions } = req.body;
    const nodeEnv = process.env.NODE_ENV;
    let password;
    if (nodeEnv == 'test') {
      password = '12345678';
    } else {
      password = generatePassword();
    }
    const hashedPassword = await hashPassword(password);
    let newRole = await db.role.findOne({ where: { name: 'vendor' } });
    if (!newRole) {
      newRole = await db.role.create({
        name: 'vendor',
      });
    }
    const vendor = await db.user.create({
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
<h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
</td>
</tr>
</tbody></table>
<p class="m_73160151937089879size-16" style="Margin-top:0;Margin-bottom:0;font-size:16px;line-height:24px" lang="x-size-16"><strong><span style="color:#000000">Congratulations on becoming one of our estemmed vendors. </span></strong></p><p style="Margin-top:20px;Margin-bottom:0"><span style="color:#000000">You are in safe hands.</span></p>
<p style="Margin-top:10px;Margin-bottom:0"><span style="color:#000000">Here at our ecommerce we have extensive experience in connecting customers to businesses.</span></p>
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
      status: req.t('success'),
      message: req.t('vendor_added_message'),
      data: vendor,
    });
  } catch (err) {
    res.status(500).json({
      message: err.errors ? err.errors[0].message : err.message,
      status: req.t('fail'),
    });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const role = await db.role.findOne({ where: { name: 'vendor' } });
    console.log(role);
    const roleId = role.id;
    console.log(roleId);
    const vendors = await db.user.findAll({ where: { roleId: roleId } });

    if (vendors.length < 1) {
      return res.status(404).json({
        status: req.t('fail'),
        message: req.t('no_vendors_found'),
      });
    }

    const vendorsData = await Promise.all(
      vendors.map(async (vendor) => {
        const vendorName = `${vendor.dataValues.firstname} ${vendor.dataValues.lastname}`;
        const vendorProduct = await db.Product.findAll({
          where: { userId: vendor.dataValues.id },
        });
        return { vendorId:vendor.dataValues.id, vendorName, vendorProduct };
      })
    );
    const vendorsProducts = await Promise.all(
      vendorsData.map(async (vendor) => {
        const {vendorId, vendorName, vendorProduct } = vendor;
        const vendorProducts = await Promise.all(
          vendorProduct.map(async (product) => {
            const { id } = product;
            const ProductAttribute = await db.ProductAttribute.findAll({
              where: { productId: id },
            });
            return {
              ...product.dataValues,
              ProductAttribute,
            };
          })
        );
        console.log(vendor);
        console.log(`==========================================================`);
        return { vendorId, vendorName, vendorProducts };
      })
    );
    res.status(200).json({
      status: req.t('success'),
      message: req.t('vendors_retrieved_successfully'),
      data: vendorsProducts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.errors ? err.errors[0].message : err.message,
      status: req.t('fail'),
    });
  }
};
