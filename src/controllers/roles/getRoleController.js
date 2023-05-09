import db from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';

export const getRole = asyncWrapper(async (req, res) => {
  const roles = await db.role.findAll();
  res.status(200).json({
    status: req.t('success'),
    message: req.t('roles'),
    data: roles,
  });
});

export const updateUserRole = asyncWrapper(async (req, res) => {
  const { id, role } = req.body;
  const user = await db.user.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: req.t('fail'),
      message: req.t('not_found'),
    });
  }
  user.roleId = role;
  await user.save();
  res.status(200).json({
    status: req.t('success'),
    message: req.t('role_updated'),
    data: user,
  });
});
