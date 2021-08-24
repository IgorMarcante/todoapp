var express = require('express')
const { ObjectId } = require('mongodb')
var router = express.Router()
const db = require('../services/db')

db.connectToDb((err) => {
    if (err) console.log(err)

    const checkBody = ((req, res, next) => {
        if ("_id" in req.body) {
            req.body._id = ObjectId(req.body._id);
        }
        next();
    })
    router.get('/list', async(req, res) => {
        const results = await db.findDocuments()
        res.send(results)
    });
    router.post('/add', async(req, res) => {
        const result = await db.insertDocument(req.body)
        res.send(result)
    });
    router.patch('/update', checkBody, async(req, res) => {
        const result = await db.updateDocument(req.body)
        res.send(result)
    });
    router.delete('/delete', checkBody, async(req, res) => {
        const result = await db.removeDocument(req.body)
        res.send()
    });
})

module.exports = router