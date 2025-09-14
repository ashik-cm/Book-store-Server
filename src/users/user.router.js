const express = require('express')
const User = require('./user.model')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SKEY


router.post('/admin' , async (req,res)=>{
    const {username,password} = req.body
    try {
        const admin = await User.findOne({username})
        if(!admin){
            res.status(401).send({message:"Admin not found"})
        }
        if(admin.password !== password){
            res.status(401).send({message:"Invalid Password"})
        }
        const token = jwt.sign({id : admin._id, username:admin.username , role:admin.role},secretKey,{expiresIn:'2hr'})
        return res.status(200).json({
            message:"Authentication Succesfull",
            token:token,
            user:{
                username:admin.username ,
                role:admin.role
            }
        })
    } catch (error) {
        console.log("failed to login as admin", error)
        res.status(401).send({message:"Invalid credentials"})
    }
})


module.exports = router