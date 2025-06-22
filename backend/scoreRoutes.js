const database = require('./connect');
const express = require('express');
const ObjectID = require('mongodb').ObjectId

let scoreRoutes = express.Router()


//Get all scores of user
scoreRoutes.route('/:userID').get( async (req, res) =>{
    let db = database.getDb()
    const userID = req.params.userID
    try{
        const result = await db.collection('scores').findOne({_id: new ObjectID(userID)})
        if(!result){
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json(result)
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Delete subject
scoreRoutes.route('/:userID/:term/:subject/del').put( async (req, res) =>{
    let db = database.getDb()
    const {userID, term, subject} = req.params

    try{
        const result = await db.collection('scores').updateOne({_id: new ObjectID(userID)}, { $unset: { [`${term}.${subject}`]: "" }})
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Score not found' });
        } 
        res.json(result);
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Add subject
scoreRoutes.route('/:userID/:term/:subject/post').put( async (req, res) =>{
    let db = database.getDb()
    const {userID, term, subject} = req.params

    try{
        const result = await db.collection('scores').updateOne(
            {_id: new ObjectID(userID)}, 
            { $set: { [`${term}.${subject}`]: {
                "hs1" : [],
                "hs2": [],
                "hs3": []
            } }})
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Score not found' });
        } 
        res.json(result);
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Add new score to this subject
scoreRoutes.route('/:userID/:term/:subject/:multiplier/:newScore/post').put( async (req, res) =>{
    let db = database.getDb()
    const {userID, term, subject, multiplier, newScore} = req.params

    try{
        const result = await db.collection('scores').updateOne(
            {_id: new ObjectID(userID)}, 
            {$push: {[`${term}.${subject}.${multiplier}`] : Number(newScore)}})

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Score not found' });
        } 
        res.json(result);
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Edit this score
scoreRoutes.route('/:userID/:term/:subject/:multiplier/:index/:newScore/edit').put( async (req, res) =>{
    let db = database.getDb()
    const {userID, term, subject, multiplier, index, newScore} = req.params

    try{
        const result = await db.collection('scores').updateOne(
            {_id: new ObjectID(userID)}, 
            {$set: {[`${term}.${subject}.${multiplier}.${index}`] : Number(newScore)}})
            
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Score not found' });
        } 
        res.json(result);
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

scoreRoutes.route('/:userID/:term/:subject/:multiplier/:index/del').put( async (req, res) =>{
    let db = database.getDb()
    const {userID, term, subject, multiplier, index} = req.params

    try{
        await db.collection('scores').updateOne(
            {_id: new ObjectID(userID)}, 
            {$unset: {[`${term}.${subject}.${multiplier}.${index}`] : 1}})

        const result = await db.collection('scores').updateOne(
            {_id: new ObjectID(userID)}, 
            {$pull: {[`${term}.${subject}.${multiplier}`] : null}})
            
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Score not found' });
        } 
        res.json(result);
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

/* 
//Get specific subject score
scoreRoutes.route('/scores/:userID/:term/:subject').get( async (req, res) =>{
    let db = database.getDb()
    const userID = req.params.userID
    const subject = req.params.subject

    try{
        const result = await db.collection('scores').findOne({_id: new ObjectID(userID)},)
        if(!result){
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json(result)
    }catch (err){
        console.error('Error fetching subject score:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Create Scores
scoreRoutes.route('/scores').post( async (req, res) =>{
    let db = database.getDb()
    let mongoObject = {
        math: req.body.math,
        physics: req.body.physics,
        english: req.body.english 
    }
    let data = await db.collection('scores').insertOne(mongoObject)

    res.json(data)
})

//Update Scores
scoreRoutes.route('/scores/:id').put( async (req, res) =>{
    let db = database.getDb()
    let mongoObject = {
        $set: {
            math: req.body.math,
            physics: req.body.physics,
            english: req.body.english 
        }
    }
    let data = await db.collection('scores').updateOne({_id: new ObjectID( req.params.id)},mongoObject)

    res.json(data)
})

//Delete scores
scoreRoutes.route('/scores/:id').delete( async (req, res) =>{
    let db = database.getDb()
    let data = await db.collection('scores').deleteOne({_id: new ObjectID( req.params.id)})
    res.json(data)
})
 */
module.exports = scoreRoutes
