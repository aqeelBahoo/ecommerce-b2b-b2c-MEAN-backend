var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/signup', function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json({ success: false, message: 'please make sure all fields were provided' });
  }
  else {
    var user = new User(req.body);

    user.save(function (err) {
      if (err) {
        res.status(403).send(err)
      }
      else {
        res.json({ success: true, message: 'successfully user created' });
      }
    }
    )
  }
})
router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      return res.send(err)
    }
    if (!user) {
      return res.send('could not authenticate user')
    }
    if (req.body.password !== user.password) {
      return res.send('password not matched');
    }
    res.json(user);
  })
});

router.get('/', function (req, res) {
  User.find().exec(function (err, user) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(user);
  })
});

//authenticate user



router.get('/:id', function (req, res) {
  User.findById({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(user);
  })
});

router.put('/:id', function (req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).exec(function (err, user) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(user);
  })
});

router.delete('/:id', function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(user);
  })
});

module.exports = router;
