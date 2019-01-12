const express = require('express');
const router =express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const productController = require('../controller/products');

const storage=multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null,'./uploads')
  },
  filename:function(req,file,cb) {
    cb(null,new Date().toISOString()+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype==='image/png'){
    cb(null,true)
  }
  else {
    cb(null,false)
  }
}
const upload=multer({
  storage:storage,
  limit:{
    fileSize:1024*1024*5
  },
  fileFilter:fileFilter
})

router.get('/' ,productController.product_get_all )

router.post('/' ,checkAuth,upload.single('productImage'),productController.product_create)

router.get('/:productsId',productController.product_get_one)

router.patch('/:productsId',checkAuth,productController.product_update)

router.delete('/:productsId',checkAuth,productController.product_delete)


module.exports = router;
