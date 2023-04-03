import { Category, Product } from '../../database/models';
import { asyncWrapper } from '../../utils/handlingTryCatchBlocks';
import emitter from '../../events/notifications';


const store = asyncWrapper (async (req, res) => {

  if (!req.body.name)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Category name is required' });

  const data = await Category.create(req.body);
  emitter.emit('newCategoryAdded', data);
  return res.status(201).json({ status: 'success', data });
});

const update = asyncWrapper( async (req, res) => {
    if(!req.body.id){
        return res.status(404).json({ status: 'fail', message: 'Category id is required' });
    }

    const row = Category.findByPk(req.body.id);
    if(row){
        return res.status(204).json({status: 'error', message: `category with id ${req.body.id}} not found`});
    }

    Category.set(req.body)

    const category = await Category.save();

    return res.status(200).json({status: 'success', message: `Category updated successfully` , data: category});
});

const destroy = asyncWrapper ( async (req, res) => {
    if(!req.params.id){
        return res.status(404).json({ status: 'fail', message: 'Category id is required' });
    }

    const row = Category.findByPk(req.body.id);
    if(row){
        return res.status(204).json({status: 'error', message: `category with id ${req.params.id}} not found`});
    }

    await row.destroy();

    return res.status(204).json({status: 'success', message: 'category deleted'});
});

const show = asyncWrapper( async (req, res) => {
    if(!req.params.id){
        return res.status(404).json({ status: 'fail', message: 'Category id is required'}) 
    }

    const row = Category.findByPk(req.body.id);
    if(row){
        return res.status(204).json({status: 'error', message: `category with id ${req.body.id}} not found`});
    }


    return res.status(200).json({status: 'success', data: row});


})

const index = asyncWrapper ( async (req, res) => {
    const data = await Category.findAll({ include: [{ model: Product}], attributes: {exclude: ['createdAt', 'updatedAt'] }})
    return res.status(200).json({status: 'success', data})
})

export default {index, store, show, update, destroy}