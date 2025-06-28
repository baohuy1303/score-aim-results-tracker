import { createContext, useContext, useState, useEffect } from 'react';
import { getScores, createScore, AssignAxiosAuthHeader } from '../api.js';
/* import axios from 'axios'; */

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
    const storedTerm = localStorage.getItem('selectedTerm') || "termOne";
    const [score, setScore] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState(storedTerm)
    const [editSubject, setEdit] = useState(false)
    let [token, setToken] = useState(null)
    const [allScores, setAllScores] = useState({})

    function unCamelCase(text) {
        const result = text.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
    function camelCase(str) {
          // converting all characters to lowercase
          let ans = str.toLowerCase();

          // Returning string to camelcase
          return ans.split(' ').reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
      }
     function getGPA(score, subject) {
         if (score && !loading) {
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
            if(Array.isArray(currentSubject.hs2)){
                let averageHS2 = 0;
                for (let index = 0; index < currentSubject.hs2.length; index++) {
                 averageHS2 += currentSubject.hs2[index];
                }
                total += averageHS2 * 2
                count += currentSubject.hs2.length * 2
            }
            if(Array.isArray(currentSubject.hs3)){
                let averageHS3 = 0;
                for (let index = 0; index < currentSubject.hs3.length; index++) {
                 averageHS3 += currentSubject.hs3[index];
                }
                total += averageHS3 * 3
                count += currentSubject.hs3.length * 3
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
         localStorage.setItem('selectedTerm', term);
     }, [term]);

    useEffect(() => {
    setToken(sessionStorage.getItem("User"))

  if (token) {
    AssignAxiosAuthHeader(token);
        async function getAllScores() {
            setLoading(true);
            try {
                let data = await getScores();
                if (data) {
                    setScore(data[term]);
                    setAllScores(data);
                } else {
                    setScore(null);
                }
            } catch (error) {
                console.error('Failed to fetch scores:', err);
                setScore(null);
            } finally {
                setLoading(false); // Always stop loading
            }
        }
            getAllScores();
}
    }, [token, term, editSubject]);
    return (
        <ScoreContext.Provider value={{score, allScores, loading, term, setTerm, getGPA, editSubject, setEdit, camelCase, unCamelCase, setToken}}>
            {children}
        </ScoreContext.Provider>
    );
}

export function useScoreContext() {
    return useContext(ScoreContext);
}
