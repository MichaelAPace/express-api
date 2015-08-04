require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var Swords = db.get('swords');
var Potions = db.get('potions');

router.get('/', function(req, res) {
  res.status(200).json({ message: 'rawr! you did it!' });
});

//Create a sword POST
router.post('/', function(req, res) {
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
})

// See all swords GET swordS
router.get('/', function(req, res) {
  Swords.find({}, function(err, swords) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(swords);
  })
});

//GET single sword
router.get('/:id', function(req, res) {
  Swords.findOne({_id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(sword)
  })
})

// Update single sword
router.put('/:id', function(req, res) {
  Swords.findAndModify({_id: req.params.id}, req.body, function(err, sword) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})

// Delete Shwarz
router.delete('/:id', function(req,res){
  Swords.remove({_id: req.params.id}, req.body, function (err, sword){
    if (err){
      throw err
    }
    res.json(req.body)
  })
})


module.exports = router
