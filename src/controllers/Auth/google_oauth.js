import db from '../../models';

export const loginWithGoogle = async (req, res) => {
    try {
      const { user, token } = req.user;
      const existingUser = await db.user.findOne({ where: { email: user.email } });
      if(!existingUser){
        res.status(302).json({status:"fail", message: req.t('user_email_not_found')})
        return
      }
      if (existingUser) {
        const role = await db.role.findOne({ where: { id: existingUser.roleId } });
        req.body.role = role.name;
        res.set('Authorization', `Bearer ${token}`);
        return res.status(200).json({ status: "sucess", email:user.email,id:user.id, token:token, role: role.name});
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status:"fail", message: req.t('500_insternal_server_error') });
    }
  };
  