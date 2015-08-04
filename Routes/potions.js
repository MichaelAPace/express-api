require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var Swords = db.get('swords');
var Potions = db.get('potions');

router.get('/', function(req, res) {
  res.status(200).json({ message: 'rawr! you did it!' });
});

//POTIONS

//Create a Potion
router.post('/', function(req, res) {
  Potions.insert(req.body, function(err, potions) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(potions);
  });
})

//See all Potions GET
router.get('/', function(req, res) {
  Potions.find({}, function(err, potion) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(potion);
  })
});

//Get single Potion
router.get('/:id', function(req, res) {
  Potions.findOne({_id: req.params.id}, function(err, potion) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(potion)
  })
})

// Update single Potion
router.put('/:id', function(req, res) {
  Potions.findAndModify({_id: req.params.id}, req.body, function(err, potion) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})

// Delete Potion
router.delete('/:id', function(req,res){
  Potions.remove({_id: req.params.id}, req.body, function (err, potion){
    if (err){
      throw err
    }
    res.json(req.body)
  })
})

module.exports = router
