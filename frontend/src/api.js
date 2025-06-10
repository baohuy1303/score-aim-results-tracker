import axios from 'axios';

const URL = 'http://localhost:3000';

export async function getScores(userID) {
    try{
    const res = await axios.get(`${URL}/scores/${userID}`);
    return res.data
    } catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}


export async function createScore(newScore) {
    const res = axios.post(`${URL}/scores`, newScore);
    return res
}

export async function addScore(userID, term, subject) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/post`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function deleteScore(userID, term, subject) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/del`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}
