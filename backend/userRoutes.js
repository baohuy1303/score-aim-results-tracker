const database = require('./connect');
const express = require('express');
const ObjectID = require('mongodb').ObjectId

let userRoutes = express.Router()


//Get all users
userRoutes.route('/users').get( async (req, res) =>{
    let db = database.getDb()
    try{
        const result = await db.collection('user').find({}).toArray()
        if(!result){
            return res.status(404).json({ message: 'All users not found' });
        }
        res.json(result)
    }catch (err){
        console.error('Error fetching all users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Get 1 user
userRoutes.route('/users/:id').get( async (req, res) =>{
    let db = database.getDb()
    const id = req.params.id
    try{
        const result = await db.collection('user').findOne({_id: new ObjectID(userID)})
        if(!result){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result)
    }catch (err){
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Create user
userRoutes.route('/users').post( async (req, res) =>{
    let db = database.getDb()
    let mongoObject = {
        email: req.body.email,
        password: req.body.password,
        scores: {}
    }
    try{
        const result = await db.collection('user').insertOne(mongoObject)
        if(!result){
            return res.status(404).json({ message: 'Users not created' });
        }
        res.json(result)
    }catch (err){
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//Update user
userRoutes.route('/users/:id').put( async (req, res) =>{
    let db = database.getDb()
    let mongoObject = {
        $set: {
            email: req.body.email,
            password: req.body.password,
            scores: req.body.scores
        }
    }
    try{
        const result = await db.collection('user').updateOne({_id: new ObjectID(id)}, mongoObject)
        if(!result){
            return res.status(404).json({ message: 'Users not updated' });
        }
        res.json(result)
    }catch (err){
        console.error('Error updating user:', err);
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