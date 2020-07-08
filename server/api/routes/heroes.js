const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Hero = require('../models/hero')

router.get('/', (req, res, next) => {
  Hero.find()
  .exec()
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.post('/', (req, res, next) => {
  const hero = new Hero({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  })
  hero.save()
  .then(result => {
    res.status(200).json({ msg: 'Add new hero' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Hero.findById(id)
  .exec()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  /*const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }*/
  Product.findByIdAndUpdate(id, //updateOps,
    { firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone },
    { new: true }
  )
  .exec()
  .then(data => {
    if(data) {
      res.status(200).json(data)
    }
    res.status(200).json({ msg: 'No hero!' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Hero.findByIdAndRemove(id)
  .exec()
  .then(data =>{
    if(data) {
      res.status(200).json({ msg: 'Hero deleted!' })
    }
    res.status(200).json({ msg: 'There is no hero!' })
  })
  .catch(err => {
    res.status(500).json({ Error: err })
  })
})

module.exports = router;
