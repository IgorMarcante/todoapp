const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'to-do-db'

var _db;

function connectToDb(callback) {
    client.connect(function(err) {
        _db = client.db(dbName);
        callback(err);
    });
}

const findDocuments = async() => {
    const collection = _db.collection('to-do-collection')

    try {
        const results = await collection.find({}).toArray();

        return results;
    } catch (error) {
        throw new Error(error)
    }
}

const insertDocument = async(document) => {
    const collection = _db.collection('to-do-collection')

    try {
        const results = await collection.insertOne(document);
        return results;
    } catch (error) {
        throw new Error(error)
    }
}

const updateDocument = async(document) => {
    const collection = _db.collection('to-do-collection')

    try {
        const results = await collection.updateOne({ _id: document._id }, { $set: document });
        return results;
    } catch (error) {
        throw new Error(error)
    }
}

const removeDocument = async(document) => {
    const collection = _db.collection('to-do-collection')

    try {
        const results = await collection.updateOne({ _id: document._id });
        return results;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    connectToDb,
    findDocuments,
    insertDocument,
    updateDocument,
    removeDocument
}