import db from '../../database/models'
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import { checkEmptyFields } from '../../utils/validations/handlingEmptyFields';
export const updateUser = asyncWrapper(async (req, res) => {
  const { firstname, lastname,phone,adress,dateofbirth,gender } = req.body;
  const emptyFields = checkEmptyFields(req.body);
  if (!emptyFields) {
    const user = await db.user.findByPk(req.user.id);
    if (!user) {
      return res.status(401).json({ message: req.t('Undiscovered'), status: req.t('fail') });
    }
    await user.update({
      firstname,
      lastname,
      phone,
      adress,
      dateofbirth,
      gender
    });
    res.status(200).json({ message: req.t('User_Updated'), status: req.t('success') });
  }
});
