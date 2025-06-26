import axios from 'axios';
import api from './api_interceptor';

const URL = 'http://localhost:3000';


//SCORES

export async function getScores(userID) {
    try{
    const res = await api.get(`${URL}/scores/${userID}`);
    return res.data
    } catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}


export async function createScore(newScore) {
    const res = api.post(`${URL}/scores`, newScore);
    return res
}

export async function addSubject(userID, term, subject) {
    try{
        const res = await api.put(`${URL}/scores/${userID}/${term}/${subject}/post`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function deleteSubject(userID, term, subject) {
    try{
        const res = await api.put(`${URL}/scores/${userID}/${term}/${subject}/del`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function addScore(userID, term, subject, multiplier, newScore) {
    try{
        const res = await api.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${newScore}/post`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}
export async function editScore(userID, term, subject, multiplier, index, newScore) {
    try{
        const res = await api.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${index}/${newScore}/edit`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function deleteScore(userID, term, subject, multiplier, index) {
    try{
        const res = await api.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${index}/del`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}


export async function chatBot(question, score, history) {
    try{
        const res = await api.post(`${URL}/scores/chatbot`, {
            question,
            score,
            history
        });
        return res
    }
    catch (error){
        console.error('Failed to fetch answers:', error?.response?.data || error.message);
        return null;
    }
}


//USERS

export async function getUser(id) {
    try {
        const res = await api.get(`${URL}/users/${id}`);
        return res;
    } catch (error) {
        console.error(
            'Failed to fetch user:',
            error?.response?.data || error.message
        );
        return null;
    }
}

export async function createUser(newUser) {
    try {
        const res = await api.post(`${URL}/users`, newUser);
        return res;
    } catch (error) {
        console.error(
            'Failed to create user:',
            error?.response?.data || error.message
        );
        return null;
    }
}

export async function updateUser(id, updatedUser) {
    try {
        const res = await api.put(`${URL}/users/${id}`, updatedUser);
        return res;
    } catch (error) {
        console.error(
            'Failed to update user:',
            error?.response?.data || error.message
        );
        return null;
    }
}

export async function logIn(user) {
    try {
        const res = await api.post(`${URL}/users/login`, user);
        return res;
    } catch (error) {
        console.error(
            'Failed to fetch user:',
            error?.response?.data || error.message
        );
        return null;
    }
}
