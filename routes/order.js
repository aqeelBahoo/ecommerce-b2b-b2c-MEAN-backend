var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Product = require('../models/product');

router.post('/', function (req, res) {

  var order = new Order(req.body);

  req.body.products.map((pro) => {
    Product.updateOne({ _id: pro._id },
      { $inc: { count: pro.count } }, function (err, res) {

      }
    )
  });

  order.save(function (err) {
    if (err) {
      res.json({ success: false, message: err })
    }
    else {
      res.json({ success: true, message: 'successfully order created' });
    }
  })
})

router.get('/', function (req, res) {
  Order.find().exec(function (err, order) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(order);
  })
});

router.get('/filterTime', function (req, res) {
  if (req.query.filter === 'today') {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    Order.find({ created_at: { $gte: start, $lt: end } }).exec(function (err, order) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(order);
    })

  } else if (req.query.filter === 'week') {
    Order.find({
      created_at: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
      }
    }).exec(function (err, order) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(order);
    })
  }
  else if (req.query.filter === 'month') {
    Order.find({
      created_at: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
      }
    }).exec(function (err, order) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(order);
    })
  }

});

router.get('/filterByUser', function (req, res) {
  console.log('test')
  /*  if (req.query.sellerId) {
     Order.find({ sellerId: req.query.sellerId }).exec(function (err, order) {
       if (err) {
         return res.json({ success: false, message: err })
       }
       res.send(order);
     })
   } */
  if (req.query.userId) {
    Order.find({ userId: req.query.userId }).exec(function (err, order) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(order);
    })
  }
});
router.get('/:id', function (req, res) {
  Order.findOne({ _id: req.params.id })
    .populate('products')
    .exec(function (err, order) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(order);
    })
});

/* router.get('/:userId', function (req, res) {
  Order.find({ userId: req.params.userId }).exec(function (err, order) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(order);
  })
}); */

module.exports = router;
