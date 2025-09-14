const order = require("./order.model")


const orderController= async (req,res) =>{
    try {
        const newOrder = await order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.error("error creating Order",error)
        res.status(500).json({message:"Failed to create an order"})
    }
}

const getOrdrsByemail= async (req,res) =>{
    try {
        const {email} = req.params
        const orders = await order.find({email}).sort({createdAt:-1})
        if(!orders){
            return res.status(404).json({message:"No orders found..!"})
        }
        res.status(200).json(orders)
    } catch (error) {
        console.error("error creating Order",error)
        res.status(500).json({message:"Failed to get orders"})
    }
}

module.exports={orderController,getOrdrsByemail}