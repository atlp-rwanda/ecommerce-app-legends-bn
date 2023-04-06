import db from '../../database/models'
import  sendEmail from '../../utils/sendEmail'
import socketIOClient from 'socket.io-client';
import cron from 'node-cron'

const templateHeader = `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
<tbody><tr>
<td style="padding-top:54px;padding-bottom:42px" align="center">
<h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Legends project</h2>
</td>
</tr>
</tbody></table>`

const templateFotter = `<h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Legends project team</i></h5>`


export const emitCategoryAdded = async (category) => {
  const vendorRole = await db.role.findOne({ where: { name: 'vendor' } });
  if(!vendorRole) return
  const vendor = await db.user.findAll({ where: { roleId: vendorRole.id } });
  const socket = socketIOClient('http://localhost:5000');
  if(!vendor) return
  for(const user of vendor){
      const notification = await db.notification.create({
          subject: `📢 New category added`,
          message: `📢 Hello ${user.firstname} new category called ${category.name} created by admin 📢`,
          type: 'newCategory',
          userId: user.id,
      });
      const sendemailOpt = {
          email: user.email,
          subject: notification.subject,
          html: `${templateHeader} <p> Dear <h2> ${user.firstname} </h2> We want to inform you new category <b>${category.name}</b>  added by admin, you can add related product on it 🍏</p> ${templateFotter}`,
      };

      await sendEmail(sendemailOpt);
    socket.emit("notification", {
      message: notification.message,
      userId: user.id
    });
  }
};


export const emitProductAdded = async (productName, vendor, categoryName) => {

    const socket = socketIOClient('http://localhost:5000');
        const notification = await db.notification.create({
            subject: `New Product added`,
            message: `🍏 Hello ${vendor.firstname} your product ${productName} added into ${categoryName} category successfully 🍏 `,
            type: 'newProduct',
            userId: vendor.id,
        });
        const sendemailOpt = {
            email: vendor.email,
            subject: notification.subject,
            html: `${templateHeader} <p> Dear <h2> ${vendor.firstname} </h2> We want to inform you that your product <b>${productName}</b>  added into ${categoryName} category successfully, thank you for trading with us 🍏</p> ${templateFotter}`,
        };

        await sendEmail(sendemailOpt);
        socket.emit("notification", {
        message: notification.message,
        userId: vendor.id
      });
};


export const emitProductRemoved = async (productName, vendor) => {
    const socket = socketIOClient('http://localhost:5000');
        const notification = await db.notification.create({
            subject: `product removed`, 
            message: `🍎 Hello ${vendor.firstname} product ${productName} removed into the stock successfully 🍎`,
            type: 'productRemoved',
            userId: vendor.id,
        });
      const sendemailOpt = {
        email: vendor.email,
        subject: notification.subject,
        html: `${templateHeader} <p> Dear <h2> ${vendor.firstname} </h2> We want to inform you that product <b>${productName}</b> removed into stock successfully 🍎</p> ${templateFotter}`,
      };
      await sendEmail(sendemailOpt);
      socket.emit("notification", {
        message: notification.message,
        userId: vendor.id
      });

    }

  

  export const emitProductExpired = async (productName, productOwnerUser) => {

    const socket = socketIOClient('http://localhost:5000');
    const notification = await db.notification.create({
      subject: `⚠️ Product expired`,
      message: `🍎 ${productName} Product has expired 🍎`,
      type: 'productExpired',
      userId: productOwnerUser.id,
    });
  
    const sendemailOpt = {
      email: productOwnerUser.email,
      subject: notification.subject,
      html: `${templateHeader} <p> Dear <h2> ${productOwnerUser.firstname} </h2> We want to inform you that your <b>${productName}</b> has expired 🍎, <i>Please go and remove it into the stock ASP!</i></p> ${templateFotter}`,
    };
    await sendEmail(sendemailOpt);
    socket.emit('notification', {
      message: notification.message,
      userId: productOwnerUser.id,
    }); 
  }
  

  export const emitProductPurchased = async (invoice) => {
    const socket = socketIOClient('http://localhost:5000');
    const buyerRole = await db.role.findOne({ where: { name: 'vendor' } });
    const allBuyers = await db.user.findAll({ where: { roleId: buyerRole.id } });
    const adminRole = await db.role.findOne({ where: { name: 'admin' } });
    const allAdmins = await db.user.findAll({ where: { roleId: adminRole.id } });
    if(!allBuyers || !allAdmins) return;
    const allUsers = allAdmins.concat(allBuyers);
    for (const user of allUsers) {
        const notification = await db.notification.create({
            subject: `Product Purchased`,
            message: `💵 Product purchased, check your email for more details 💵  `,
            type: 'productPurchased',
            userId: user.id,
        });
        const sendemailOpt = {
            email: user.email,
            subject: notification.subject,
            html: `${templateHeader} <p> Dear <h2> ${user.firstname} </h2> We want to inform you that product purchased with the following details <b>${invoice}</b>  🍏</p> ${templateFotter}`,
        };

      await sendEmail(sendemailOpt);
      socket.emit("notification", {
        message: notification.message,
        userId: user.id
      });

    }
};




export const emitUpdatePassword = async (user) => {

  const socket = socketIOClient('http://localhost:5000');
      const notification = await db.notification.create({
          subject: `🔐 Update your password`,
          message: `🔐 Hello ${user.firstname} your password need to be updated!, check you email for more details 🔐`,
          type: 'passwordUpdate',
          userId: user.id,
      });
      const sendemailOpt = {
          email: user.email,
          subject: notification.subject,
          html: `${templateHeader} <p> Dear <h2>${user.firstname}</h2> We are writing to inform you that for security purposes, 
          it is necessary for you to update your password. 
          This will help to ensure the protection of your personal and account information. </p>
          <p>Click on the link below to update your password.</p>
          <a http://localhost:5000/docs/#/Auth/put_api_v1_users_password__userId__update">Update Password</a>
          <p>We recommend that you choose a strong and unique password that you have not used before. 
          Do not share your password with anyone or write it down.</p>
          <p>If you have any questions or concerns regarding this process, 
          please do not hesitate to contact our customer support team.</p>
          <p>Thank you for your cooperation in helping to keep your account secure. </p> ${templateFotter}`,
      };

      await sendEmail(sendemailOpt);
      socket.emit("notification", {
      message: notification.message,
      userId: user.id
    });
};

