import db from '../../database/models';
import { hashPassword } from '../../utils/hashpassword';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
export const createAdmin = asyncWrapper(async (req, res) => {
  //add admins
    const { firstname, lastname, email, password, phone, permissions } =
    req.body;
  
    const hashedPassword = await hashPassword(password);

    let newRole = await db.role.findOne({ where: { name : 'admin'} })
    if(!newRole){
      newRole = await db.role.create({
        name: 'admin',
      });
    }
    const admin = await db.user.create({
      ...req.body,
      password: hashedPassword,
      roleId: newRole.id,
    });
    const newPermission = await db.permission.create({
      name: permissions,
    });

    newPermission && await db.rolePermission.create({
      roleId: newRole.id,
      permissionId: newPermission.id,
    });
    res.status(201).json({
      message: req.t('admin_added_message'),
      status: req.t('success'),
      data: admin
    });
});

export const getAllUsers =asyncWrapper(async (req, res) => {
  const users = await await db.user.findAll({
    attributes: { exclude: ['password', 'roleId'] },
    include: {
      model: db.role,
      attributes: ['name'],
      include: {
        model: db.permission,
        attributes: { exclude: ['id'] },
      },
    },
  });
  res.status(200).json({
    status: req.t('success'),
    message: req.t('users_fetched'),
    data: users
  });
});

export const deleteUsers =asyncWrapper(async (req, res) => {
    await db.user.destroy({ where: { id: req.params.id } });
  res.status(200).json({
    status: req.t('success'),
    message: req.t('user_deleted')
  });
});
export const getSingleUser =asyncWrapper(async (req, res) => {
  console.log(req.params.id);
  const singleUser = await db.user.findAll({
    where: { id: req.params.id },
    attributes: { exclude: ['password', 'roleId'] },
    include: {
      model: db.role,
      attributes: ['name'],
      include: {
        model: db.permission,
        attributes: { exclude: ['id'] },
      },
    },
  });
  res.status(200).json({
    status: req.t('success'),
    message: req.t('single_user_fetched'),
    data:singleUser
  });
});
