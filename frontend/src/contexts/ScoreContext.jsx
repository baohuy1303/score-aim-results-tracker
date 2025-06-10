import { createContext, useContext, useState, useEffect } from 'react';
import { getScores, createScore } from '../api.js';

const ScoreContext = createContext();

export function ScoreProvider({ userID, children }) {
    const [score, setScore] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState('termOne')
    const [editSubject, setEdit] = useState(false)
    const userid = userID

     function getGPA(score, subject) {
         if (score) {
            let currentSubject = score?.[subject];
            let total = 0;
            let count = 0;
            if(Array.isArray(currentSubject.hs1)){
                let averageHS1 = 0;
                for (let index = 0; index < currentSubject.hs1.length; index++) {
                 averageHS1 += currentSubject.hs1[index];
                }
                total += averageHS1
                count += currentSubject.hs1.length
            }
            if(typeof currentSubject.hs2 === 'number'){
                total += currentSubject.hs2 * 2
                count += 2
            }
            if(typeof currentSubject.hs3 === 'number'){
                total += currentSubject.hs3 * 3
                count += 3
            }

            if(count > 0){
                return (total / count).toFixed(2)
            }
            else{
                return 'N/A'
            }


             /* let averageHS1 = 0;
             for (let index = 0; index < currentSubject.hs1.length; index++) {
                 averageHS1 += currentSubject.hs1[index];
             }
             averageHS1 = averageHS1 / currentSubject.hs1.length;
             return (
                 (averageHS1 +
                     currentSubject.hs2 * 2 +
                     currentSubject.hs3 * 3) /
                 (5 + currentSubject.hs1.length)
             ).toFixed(2); */
         } else return 'N/A';
     }

    useEffect(() => {
        async function getAllScores() {
            let data = await getScores(userID);
            if (data) {
                setScore(data[term]);
                setLoading(false);
            }
        }
        getAllScores();
    }, [userID, term, editSubject]);
    return (
        <ScoreContext.Provider value={{ userid, score, loading, term, setTerm, getGPA, editSubject, setEdit}}>
            {children}
        </ScoreContext.Provider>
    );
}

export function useScoreContext() {
    return useContext(ScoreContext);
}
