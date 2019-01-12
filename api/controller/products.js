const mongoose = require('mongoose');

const Order = require('../models/order.js');
const Product = require('../models/product.js');

exports.product_get_all=(req,res,next)=>{
  Product.find()
  .select('name price _id productImage')
  .exec()
  .then(doc=>{
    console.log(doc);
    const response={
      count:doc.length,
      products:doc.map(item=>{
        return {
        name:item.name,
        price:item.price,
        _id:item._id,
        productImage:item.productImage,
        request:{
          type:'GET',
          url:'http://localhost:3000/products/'+item._id
        }
      }
      })
    }
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
}
exports.product_create=(req,res,next)=>{
  console.log(req.file);
  const product=new Product({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    price:req.body.price,
    productImage:req.file.path
  })
  product.save()
    .then(result=>{
      console.log(result);
      res.status(201).json({
        message:'created product successfully',
        createdProduct:{
          name:result.name,
          price:result.price,
          _id:result._id,
          productImage:result.productImage,
          request:{
            type:'GET',
            url:'http://localhost:3000/products/'+result._id
          }
        }
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })

}

exports.product_get_one=(req,res,next)=>{
  const id = req.params.productsId;
  Product.findById(id)
  .select('name price _id productImage')
  .exec()
  .then(doc=>{
    console.log(doc);
    if(doc){
      res.status(200).json({
        product:doc,
        request:{
          type:'GET',
          url:'http://localhost:3000/products/'
        }
      })
    }else {
      res.status(404).json({message:'no data found for this id'})
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

}
exports.product_update=(req,res,next)=>{
  const id=req.params.productsId;
  const updateOps={};
  for(const ops of req.body){
    updateOps[ops.propName]=ops.value
  }
  Product.update({_id:id},{$set:updateOps})
  .exec()
  .then(doc=>{
    console.log(doc);
    res.status(200).json({
      message:'product updated',
      request:{
        type:'GET',
        url:'http://localhost:3000/products/'+id
      }
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })
}

exports.product_delete=(req,res,next)=>{
  const id=req.params.productsId;
  Product.remove({_id:id})
  .exec()
  .then(doc=>{
    res.status(200).json({
      message:'product deleted',
      request:{
        type:'POST',
        url:'http://localhost:3000/products/',
        body:{
          name:'String',
          price:'Number'
        }
      }
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })
}
