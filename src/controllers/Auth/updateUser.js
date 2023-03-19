import db from '../../models'

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const user = await db.user.findByPk(req.user.id);

    if (!user) {
    
      return res.status(404).json({ message: req.t('Undiscovered'), status: req.t('fail') });
    }
    console.log(user)

    await user.update({
      firstname,
      lastname,
      email,
      phone,
    });

    res.status(200).json({ message: req.t('User_Updated'), status: req.t('success') });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, status: 'failed' });
  }
};
