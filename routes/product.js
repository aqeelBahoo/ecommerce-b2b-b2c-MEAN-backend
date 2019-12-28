var express = require('express');
var router = express.Router();
var Product = require('../models/product');


/* GET users listing. */
router.get('/', function (req, res) {
  const query = req.query;
  if (query.status) {
    Product.find({ status: query.status }).exec(function (err, product) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(product);
    })
  }
  else if (query.name) {
    Product.find({ name: query.name }).exec(function (err, product) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(product);
    })
  }
  else if (query.sellerId) {
    Product.find({ sellerId: query.sellerId }).exec(function (err, product) {
      if (err) {
        return res.json({ success: false, message: err })
      }
      res.send(product);
    })
  } else {
    Product.find().exec(function (err, product) {
      if (err) {
        return res.status(403)('no product found')
      }
      res.send(product);
    })
  }
});

router.post('/', function (req, res) {

  var product = new Product(req.body);

  product.save(function (err) {
    if (err) {
      res.json({ success: false, message: err })
    }
    else {
      res.json({ success: true, message: 'successfully product created' });
    }
  }
  )
})

router.get('/:id', function (req, res) {
  Product.findById({ _id: req.params.id }).exec(function (err, product) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(product);
  })
});


router.put('/:id', function (req, res) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).exec(function (err, product) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(product);
  })
});

router.delete('/:id', function (req, res) {
  Product.findByIdAndRemove({ _id: req.params.id }).exec(function (err, product) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(product);
  })
});
/* 
router.get('/:name', function (req, res) {
  Product.find({ name: req.params.name }).exec(function (err, product) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(product);
  })
});

router.get('/:status', function (req, res) {
  Product.find({ status: req.params.status }).exec(function (err, product) {
    if (err) {
      return res.json({ success: false, message: err })
    }
    res.send(product);
  })
});


 */

/* GET users listing. */






module.exports = router;
