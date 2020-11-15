const router = require('express').Router();
let Users = require('../models/users_model');

router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const date = Date.parse(req.body.date);

  const newUsers = new Users({
    username,
    email,
    password,
    date
  });

  newUsers.save()
    .then(() => res.json('Users added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
  Users.findById(req.params.id)
    .then(users => goods.json(users))
    .catch(err => res.status(400).json('Error: '+err'));
});

router.route('/:id').delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => goods.json('Users deleted!'))
    .catch(err => res.status(400).json('Error: '+err'));
});

router.route('/update/:id').post((req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;
      users.email = req.body.email;
      users.password = req.body.password;
      users.date = Date.parse(req.body.date);

      users.save()
        .then(() => res.json('Users updated!'))
        .catch(err => res.status(400).json('Error: '+err'));
    })
    .catch(err => res.status(400).json('Error: '+err'));
});


module.exports = router;
