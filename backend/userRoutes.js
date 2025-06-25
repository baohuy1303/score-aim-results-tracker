const database = require('./connect');
const express = require('express');
const ObjectID = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

let userRoutes = express.Router()
const SALT_ROUNDS = 7

//Get all users
userRoutes.route('/users').get( async (req, res) =>{
    let db = database.getDb()
    try{
        const result = await db.collection('users').find({}).toArray()
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
        const result = await db.collection('users').findOne({_id: new ObjectID(userID)})
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
    let db = database.getDb();

    const takenEmail = await db.collection('users').findOne({ email: req.body.email });

    if (!takenEmail) {
        const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        let mongoObject = {
            email: req.body.email,
            password: hash,
            scores: {},
        };
        try {
            const result = await db.collection('users').insertOne(mongoObject);
            if (!result) {
                return res.status(404).json({ message: 'Users not created' });
            }
            res.json(result);
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.json({ message: 'Email already used!' });
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
        const result = await db.collection('users').updateOne({_id: new ObjectID(id)}, mongoObject)
        if(!result){
            return res.status(404).json({ message: 'Users not updated' });
        }
        res.json(result)
    }catch (err){
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
//LOGIN ROUTE
userRoutes.route('/users/login').post( async (req, res) =>{
    let db = database.getDb();

    const user = await db.collection('users').findOne({ email: req.body.email });

    if (user) {
        try {
            let confirmation = await bcrypt.compare(req.body.password, user.password);
            if (!confirmation) {
                res.json({success: false, message: 'Incorrect password'})
            }else{
                res.json({success: true, user});
            }
        } catch (err) {
            console.error('Error logging in user:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.json({ success: false, message: 'User not found' });
    }

})
module.exports = userRoutes