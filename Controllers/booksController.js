const mongodb = require('../data/database');
const ObjectId = require('mongodb') .ObjectId;

const getAll = async (req, res) => {
   const result = await mongodb.getDatabase().db().collection('books').find();
   result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
   });

}; 

const getSingle =  async (req, res) => {
   const bookId = new ObjectId(req.params.id);
   const result = await mongodb.getDatabase().db().collection('books').find({_id: bookId});
   result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books [0]);
   });
}; 

const createBook = async (req, res) => {
   const book = {
      book_Name: req.body.bookName,
      author_Name: req.body.authorName,
      Number_Chapters:req.body.ChaptersNumber,
      book_color:req.body.bookcolor,
      Published_Date:req.body.PublishedDate
   };
   const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
   if (response.acknowledged) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while updating the book.');
   }
};

const updateBook = async (req, res) =>  {
   const bookId = new ObjectId(req.params.id);
   const book = {
      book_Name: req.body.bookName,
      author_Name: req.body.authorName,
      Number_Chapters:req.body.ChaptersNumber,
      book_color:req.body.bookcolor,
      Published_Date:req.body.PublishedDate
   };
   const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id: bookId}, book);
   if (response.modifiedCount > 0) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while updating the book.');
   }
};

const deleteBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id: bookId});
    if (response.deleteCount > 0) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while deleting the book.');
   }

}

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}