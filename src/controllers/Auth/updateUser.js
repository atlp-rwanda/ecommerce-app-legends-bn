import db from '../../models'

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const user = await db.user.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 'failed' });
    }

    if (user.id !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized', status: 'failed' });
    }

    await user.update({
      firstname,
      lastname,
      email,
      phone,
    });

    res.status(200).json({ message: 'Profile updated', status: 'success' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, status: 'failed' });
  }
};
