const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//============= find all tags =================//
router.get('/', async(req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(500).json(err);
  }  
});

//================ find a single tag by its `id`=================//
router.get('/:id', async(req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product}
      ],
    });

    if (!tags) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

//=============== create a new tag ==============//
router.post('/', async(req, res) => {
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

//========== update a tag's name by its `id` value ===========//
router.put('/:id', async(req, res) => {
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!tags[0]) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

//===========delete on tag by its `id` value=============//
router.delete('/:id', async(req, res) => {
  try {
    const tags = await Tag.destroy({
      where: { id: req.params.id, }
    });

    if (!tags) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json({message: 'Successfully deleted tag'});
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
