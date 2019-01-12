const express = require('express');
const router =express.Router();

const checkAuth = require('../middleware/check-auth');
const orderController = require('../controller/orders');

router.get('/' ,checkAuth,orderController.order_get_all )

router.post('/' ,checkAuth,orderController.order_create )

router.get('/:orderId',checkAuth,orderController.order_get_one)

router.delete('/:orderId',checkAuth,orderController.order_delete)

module.exports = router;
