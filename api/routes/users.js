const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Product = require('../models/product.js');

router.post('/signup',(req,res,next)=>{
  User.find({email:req.body.email})
  .exec()
  .then(user=>{
    if(user.length >= 1){
      return res.status(409).json({
        message:'email exists'
      });
    }
    else {
      bcrypt.hash(req.body.password,10,(error,hash)=>{
        if (error) {
          return res.status(500).json({
            error:error,
            message:'from bcrypt'
          });
        }
        else {
          const user= new User({
            _id:new mongoose.Types.ObjectId(),
            email:req.body.email,
            password:hash
          })
          user.save()
          .then(result=>{
            console.log(result);
            res.status(201).json({
              message:'user Created'
            })
          })
          .catch(err=>{
            res.status(500).json({
              error:err,
              message:'from savin'

            })
          })
        }
      })
    }
  })
  .catch(err=>{
    res.status(500).json({
      error:err,
      message:'from first'

    })
  })
})

router.delete('/:userId',(req,res,next)=>{
  User.remove({_id:req.params.userId})
  .exec()
  .then(result=>{
    res.status(200).json({
      message:'User deleted'
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})


module.exports = router;
