const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SKEY

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Acces Denied . No token Found" })
    }
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.status(403).json({ message: "Invalid credentials" })
        }
        req.user = user
        next()
    })
}

module.exports = verifyAdminToken