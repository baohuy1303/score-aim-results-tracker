import {getScores, createScore} from '../api.js'
import {useState, useEffect} from 'react'
import { useScoreContext } from '../contexts/ScoreContext.jsx';
import SubjectCard from '../components/SubjectCard.jsx';

function Home(){

    const {score, loading, term, setTerm, getGPA} = useScoreContext()

/*     const [score, setScore] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getAllScores(){
            let data = await getScores('683f26b3b1fbaef76b4e74f6', '')
            if(data){
                setScore(data)
                setLoading(false);
            }
        }
        getAllScores()
    }, [])
 */
/*     useEffect(()=>{
        if(score){
            console.log(score[0].math)
        }
    },[score]) */

    function averageGPA(){
        if(score){
            let total = 0;
            let count = 0;
           Object.entries(score).forEach( ([subject]) =>{
            if(getGPA(score, subject) != 'N/A'){
                total += Number(getGPA(score,subject))
                count += 1
            }
           })
           return (total/count).toFixed(2)
        }else
            return 'N/A'
    } 

    function makeScores() {
        let newScore = {
            math: {
                hs1: [5, 7],
                hs2: 8.3,
                hs3: 7.5
            },
            physics: {
                hs1: [9, 5],
                hs2: 5.5,
                hs3: 8.3
            },
            english: {
                hs1: [8, 9],
                hs2: 10,
                hs3: 10
            },
        }
        
        createScore(newScore)
    }

      const handleChange = (e) => {
          setTerm(e.target.value);
      };

    return (
        <>
            <div>
                <label>
                    <input
                        type="radio"
                        value="termOne"
                        checked={term === 'termOne'}
                        onChange={handleChange}
                    />
                    Term 1
                </label>
                <label style={{ marginLeft: '1rem' }}>
                    <input
                        type="radio"
                        value="termTwo"
                        checked={term === 'termTwo'}
                        onChange={handleChange}
                    />
                    Term 2
                </label>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>AVERAGE GPA: {averageGPA()}</h1>
                    {Object.entries(score).map(([subject]) => {
                        return <SubjectCard key={subject} subject={subject} homeCheck={true}/>
                    })}
                </div>
            )}
            <button onClick={makeScores}>Create Score</button>
        </>
    );
}

export default Home