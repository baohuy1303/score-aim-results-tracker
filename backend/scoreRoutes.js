const database = require('./connect');
const express = require('express');
const ObjectID = require('mongodb').ObjectId
require('dotenv').config({path: "./.env"});
const {GoogleGenAI} = require("@google/genai");
const jwt = require('jsonwebtoken')

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
let scoreRoutes = express.Router()

function verifyToken(req, res, next){
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if(!token){
        return res.status(401).json({message: 'Authentication token is missing'})
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error){
            return res.status(403).json({message: 'Invalid token'})
        }

        req.user = user
        next()
    })

}

//Get all scores of user
scoreRoutes.route('/:userID').get(verifyToken, async (req, res) =>{
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
scoreRoutes.route('/:userID/:term/:subject/del').put(verifyToken, async (req, res) =>{
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
scoreRoutes.route('/:userID/:term/:subject/post').put(verifyToken, async (req, res) =>{
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
scoreRoutes.route('/:userID/:term/:subject/:multiplier/:newScore/post').put(verifyToken, async (req, res) =>{
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
scoreRoutes.route('/:userID/:term/:subject/:multiplier/:index/:newScore/edit').put(verifyToken, async (req, res) =>{
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

//Delete this score
scoreRoutes.route('/:userID/:term/:subject/:multiplier/:index/del').put(verifyToken, async (req, res) =>{
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



function formatScoresForGemini(subjects) {
  const weightMap = { hs1: 1, hs2: 2, hs3: 3 };
  const labelMap = { hs1: 'x1', hs2: 'x2', hs3: 'x3' };
  let result = '';

  for (const subject in subjects) {
    let totalScore = 0;
    let totalWeight = 0;
    const sectionData = [];

    for (const hs in subjects[subject]) {
      const scores = subjects[subject][hs];
      const weight = weightMap[hs];
      const sum = scores.reduce((a, b) => a + b, 0);
      totalScore += sum * weight;
      totalWeight += scores.length * weight;
      sectionData.push(`${labelMap[hs]}: [${scores.join(', ')}]`);
    }

    const average = totalWeight === 0 ? 0 : (totalScore / totalWeight).toFixed(2);
    result += `${subject} -> ${sectionData.join(' | ')} | weighted average: ${average}\n`;
  }

  return result.trim();
}

function formatChatHistory(chatHistory) {
  return chatHistory.map(
    ({ role, text }) => `${role === 'user' ? 'Student' : 'Advisor'}: ${role === 'user' ? text : text.data }`
  ).join('\n');
}


scoreRoutes.route('/chatbot').post(verifyToken, async (req, res) => {
  const { question, score, history } = req.body; 
    const grades = formatScoresForGemini(score)
    const chatHistory = formatChatHistory(history)

    if (!question || typeof question !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid question in request body' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: question, // ✅ dynamically sent question
            },
          ],
        },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // optional
        },
        systemInstruction: `You are a friendly study advisor chatbot, created by Huy B. Huynh to help students track scores and ask related questions. Keep your response casual, direct, and between 10-300 words. Headers, formulas, or formatting like bold or italic, just plain text and simple outline if possible. Never explain how GPA is calculated.
Use these scores: ${grades}. It contains all the subjects the student studied in one term — where hs1, hs2, and hs3 represent exams scores weighted as x1 (×1), x2 (×2), and x3 (×3). Only refer to hs1, hs2, hs3 as x1, x2, and x3 in your answer. 
Give honest, actionable advice like you're chatting with a student. If asked how to improve grades, remember: x3 is hardest to change, then x2, then x1. The user can either fix 1–2 scores per section or add one more score to each. 
Focus on realistic improvements (starting from x1 if possible) that give the most impact. If helpful, include hypotheticals like: “If you score a 9 in your x1 exam, your average could reach [estimated score].”
This is our previous chat history ${chatHistory}`,
      },
    });


    if (!response) {
      return res.status(404).json({ message: 'No response from Gemini' });
    }

    res.json( response.text );

  } catch (error) {
    console.error('❌ Error getting response:', error.message || error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = scoreRoutes
