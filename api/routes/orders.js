const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order.js');
const Product = require('../models/product.js');

router.get('/' , (req,res,next)=>{
  Order.find()
  .select('_id product quantity')
  .exec()
  .then(docs=>{
    res.status(200).json({
      count:docs.length,
      orders:docs.map(doc=>{
        return {
          _id:doc._id,
          product:doc.product,
          quantity:doc.quantity,
          request:{
            type:'GET',
            url:'http://localhost:3000/orders/'+doc._id
          }
        };
      })
    })
  })
  .catch(err=>{
    res.status(500).json({
      err:err
    })
  })
})


router.post('/' , (req,res,next)=>{
  Product.findById(req.body.productId)
  .exec()
  .then(product=>{
    if (!product) {
      return res.status(404).json({
        message:'product not found'
      });
    }
    const order=new Order({
      _id:new mongoose.Types.ObjectId,
      quantity:req.body.quantity,
      product:req.body.productId
    })
    return order.save()
  })
  .then(result=>{
    console.log(result);
    res.status(200).json({
      message:'order stored',
      createdOrder:{
        _id:result._id,
        product:result.product,
        quantity:result.quantity
      },
      request:{
        type:'GET',
        url:'http://localhost:3000/orders/'+result._id
      }
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})


router.get('/:orderId',(req,res,next)=>{
  Order.findById(req.params.orderId)
  .select('_id product quantity')
  .exec()
  .then(order=>{
    if (!order) {
      res.status(404).json({
        message:'order not found'
      })
    }
    res.status(200).json({
      order:order,
      request:{
        type:'GET',
        url:'http://localhost:3000/orders'
      }
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})


router.delete('/:orderId',(req,res,next)=>{
  Order.remove({_id:req.params.orderId})
  .exec()
  .then(result=>{
    res.status(200).json({
      message:'order deleted',
      request:{
        type:'POST',
        url:'http://localhost:3000/orders',
        body:{productId:'ID',quantity:'NUMBER'}
      }
    })
  })
})

module.exports = router;
