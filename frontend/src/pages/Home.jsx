import {getScores, createScore} from '../api.js'
import {useState, useEffect} from 'react'
import { useScoreContext } from '../contexts/ScoreContext.jsx';
import SubjectCard from '../components/SubjectCard.jsx';

function Home(){

    const {score, loading, getGPA} = useScoreContext()

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


    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col justify-center items-center max-h-[100%] text-center'>
                    <div>
                    <h1 className='text-[5vw] font-bold mb-0 leading-18 p-4 border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 bg-amber-100 mt-[10vh]'>{averageGPA()}</h1>
                    <h1 className='text-[2vw] font-black mt-5 mb-5'>AVERAGE GPA</h1>
                    
                    </div>

                    <div className='flex flex-wrap justify-center gap-10 max-w-[80vw] mb-[10vh]'>
                    {Object.entries(score).map(([subject]) => {
                        return <SubjectCard key={subject} subject={subject} homeCheck={true}/>
                    })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home