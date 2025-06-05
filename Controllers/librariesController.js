const mongodb = require('../data/database');
const ObjectId = require('mongodb') .ObjectId;

const getAll = async (req, res) => {
   const result = await mongodb.getDatabase().db().collection('libraries').find();
   result.toArray().then((libraries) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(libraries);
   });

}; 

const getSingle =  async (req, res) => {
   const libraryId = new ObjectId(req.params.id);
   const result = await mongodb.getDatabase().db().collection('libraries').find({_id: libraryId});
   result.toArray().then((libraries) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(libraries [0]);
   });
}; 

const createlibrary = async (req, res) => {
   const library = {
      library_Name: req.body.libraryName,
      library_Owner: req.body.libraryOwner,
      library_location:req.body.librarylocation,
      library_color:req.body.librarycolor,
      library_established_Year : req.body.libraryEstablishedYear,
      library_total_Books : req.body.libraryTotalBooks,
      library_Open_Hours:req.body.libraryOpenHours,
      library_Contact_Email: req.body.libraryContactEmail
   };
   const response = await mongodb.getDatabase().db().collection('libraries').insertOne(library);
   if (response.acknowledged) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while updating the library.');
   }
};

const updatelibrary = async (req, res) =>  {
   const libraryId = new ObjectId(req.params.id);
   const library = {
      library_Name: req.body.libraryName,
      library_Owner: req.body.libraryOwner,
      library_location:req.body.librarylocation,
      library_color:req.body.librarycolor,
      library_established_Year: req.body.libraryEstablishedYear,
      library_total_Books : req.body.libraryTotalBooks,
      library_Open_Hours:req.body.libraryOpenHours,
      library_Contact_Email: req.body.libraryContactEmail
   };
   const response = await mongodb.getDatabase().db().collection('libraries').replaceOne({_id: libraryId}, library);
   if (response.modifiedCount > 0) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while updating the library.');
   }
};

const deletelibrary = async (req, res) => {
    const libraryId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('libraries').deleteOne({_id: libraryId});
    if (response.deleteCount > 0) {
      res.status(204).send();
   } else{
      res.status(500).json(response.error || 'some error occurred while deleting the library.');
   }

}

module.exports = {
    getAll,
    getSingle,
    createlibrary,
    updatelibrary,
    deletelibrary
}