const book = require("./book.model");


const postaBookController = async (req, res) => {
    try {
        const newBook = await book({ ...req.body })
        await newBook.save()
        res.status(200).send({ message: "Book Posted Succesfully", book: newBook })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error occured ...!" })

    }
}

//get all books
const getAllBooksController = async (req, res) => {
    try {
        const books = await book.find().sort({ createdAt: -1 })
        res.status(200).send(books)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error fetching books data ...!" })
    }
}

//get single books
const getSingleBooksController = async (req, res) => {
    try {
        const { id } = req.params
        const books = await book.findById(id)
        if (!books) {
            res.status(404).send(books)
        }
        res.status(200).send(books)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error fetching books data ...!" })
    }
}

// update book data
const editBookController = async (req, res) => {
    try {
        const { id } = req.params
        const updateBook = await book.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateBook) {
            res.status(404).send({ message: "Book Not Found..." })
        }
        res.status(200).send({ message: "Book Updated Succesfully", books: updateBook })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error Updating Book ...!" })
    }
}

// delete book 
const deleteBookController = async (req, res) => {
    try {
        const { id } = req.params
        const deleteBook = await book.findByIdAndDelete(id)
        if (!deleteBook) {
            res.status(404).send({ message: "Book not found...!" })
        }
        res.status(200).send({ message: "Book deleted Succesfully...!" ,books:deleteBook})
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error Updating Book ...!" })
    }
}
module.exports = { postaBookController, getAllBooksController, getSingleBooksController, editBookController, deleteBookController }