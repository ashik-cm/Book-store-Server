const express = require('express')
const { orderController, getOrdrsByemail } = require('./ordercontroller')

const router = express.Router()

// create order
router.post('/',orderController)

//get orders by user email
router.get('/email/:email',getOrdrsByemail)

module.exports = router