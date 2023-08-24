const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//================= Find all categories, to include their Products==============//
router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
        include: [{model: Product}],
    });
    res.status(200).json(categories);
  }
  catch (err){
    res.status(500).json(err);
  }
});


//================ find one category by its `id` value==============//
router.get('/:id', async(req, res) => {
  try{
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categories) {
      res.status(404);
      return;
    }
    res.status(200).json(categories);
  }
  catch(err){
    res.status(500).json(err);
  }
});


//============= create a new category==============//
router.post('/', async(req, res) => {
  try{
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  }
  catch(err){
    res.status(500).json(err);
  }
});

//==============update a category by its `id` value============//
router.put('/:id', async(req, res) => {
  try{
    const categories = await Category.update(req.body, {
      where:{ id: req.params.id }
    });
    if(!categories[i]) {
      res.status(404);
      return;
    }
    res.status(200).json(categories);
  }
  catch(err){
    res.status(500).json(err);
  }
});

//==============delete a category by its `id` value=============//
router.delete('/:id', async(req, res) => {
  try{
    const categories = await Category.destroy({
      where: { id: req.params.id }
    });
    if(!categories) {
      res.status(404);
      return;
    }
    res.status(200).json(categories);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;