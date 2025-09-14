const express = require('express')
const book = require('./book.model')
const { postaBookController, getAllBooksController, getSingleBooksController, editBookController, deleteBookController } = require('./bookController')
const verifyAdminToken = require('../middleware/verifyAdmin')
const router = express.Router()

// post Book 
router.post("/create-book",verifyAdminToken, postaBookController)

// get all books
router.get("/",getAllBooksController)

// single book
router.get('/:id',getSingleBooksController)

// update a book
router.put('/edit/:id',verifyAdminToken,editBookController)

// delete book 
router.delete('/delete/:id',verifyAdminToken, deleteBookController)

module.exports = router