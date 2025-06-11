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

export async function addSubject(userID, term, subject) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/post`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function deleteSubject(userID, term, subject) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/del`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function addScore(userID, term, subject, multiplier, newScore) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${newScore}/post`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}
export async function editScore(userID, term, subject, multiplier, index, newScore) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${index}/${newScore}/edit`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}

export async function deleteScore(userID, term, subject, multiplier, index) {
    try{
        const res = await axios.put(`${URL}/scores/${userID}/${term}/${subject}/${multiplier}/${index}/del`);
        return res
    }
    catch (error){
        console.error('Failed to fetch scores:', error?.response?.data || error.message);
        return null;
    }
}
