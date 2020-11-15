const router = require('express').Router();
let Goods = require('../models/goods_model');

router.route('/').get((req, res) => {
  Goods.find()
    .then(goods => res.json(goods))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
  const serverid = req.body.serverid;
  const param1 = req.body.param1;
  const param2 = req.body.param2;
  const imgpath = req.body.imgpath;
  const date = Date.parse(req.body.date);

  const newGoods = new Goods({
    serverid,
    param1,
    param2,
    imgpath,
    date
  });

  newGoods.save()
    .then(() => res.json('Goods added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
  Goods.findById(req.params.serverid)
    .then(goods => goods.json(goods))
    .catch(err => res.status(400).json('Error: '+err'));
});

router.route('/:id').delete((req, res) => {
  Goods.findByIdAndDelete(req.params.serverid)
    .then(() => goods.json('Goods deleted!'))
    .catch(err => res.status(400).json('Error: '+err'));
});

router.route('/update/:id').post((req, res) => {
  Goods.findById(req.params.serverid)
    .then(goods => {
      goods.serverid = req.body.serverid;
      goods.param1 = req.body.param1;
      goods.param2 = req.body.param2;
      goods.imgpath = req.body.imgpath;
      goods.date = Date.parse(req.body.date);

      goods.save()
        .then(() => res.json('Goods updated!'))
        .catch(err => res.status(400).json('Error: '+err'));
    })
    .catch(err => res.status(400).json('Error: '+err'));
});

module.exports = router;
