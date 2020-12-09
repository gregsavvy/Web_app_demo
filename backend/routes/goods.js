const router = require('express').Router();
let Goods = require('../models/goods_model');
const multer = require('multer');
const path = require('path')

// file upload storage
const storageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve('../', 'src/img/'));
  },
  filename: (req,file,callback) => {
    callback(null, file.originalname);
  }
})

const upload = multer({storage:storageConfig});

// routes
router.route('/').get((req, res) => {
  Goods.find()
    .then(goods => res.json(goods))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post(upload.single('img'), (req, res, next) => {
  const param1 = req.body.param1;
  const param2 = req.body.param2;
  const img = req.file.originalname;
  const date = Date.parse(req.body.date);

  const newGoods = new Goods({
    param1,
    param2,
    img,
    date
  });

  newGoods.save()
    .then(() => res.json('Goods added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
  Goods.findById(req.params.id)
    .then(goods => res.json(goods))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
  Goods.findByIdAndDelete(req.params.id)
    .then(() => res.json('Goods deleted!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post(upload.single('img'), (req, res, next) => {
  Goods.findById(req.params.id)
    .then(goods => {
      goods.param1 = req.body.param1;
      goods.param2 = req.body.param2;
      goods.img = req.file.originalname;
      goods.date = Date.parse(req.body.date);

      goods.save()
        .then(() => res.json('Goods updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;
