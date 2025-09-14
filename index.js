const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')

const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://book-store-frontent.vercel.app'],
    credentials:true
}))

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.router')
const adminRoutes = require('./src/stats/admin.stats')

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)



async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
    app.use('/', (req, res) => {
        res.send('The book server is running succesfully on port 4000')
    })
}

main().then(() => console.log("MongoDB connected succesfully...")).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
