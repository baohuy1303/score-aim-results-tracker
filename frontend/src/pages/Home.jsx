import {getScores, createScore} from '../api.js'
import {useState, useEffect} from 'react'
import { useScoreContext } from '../contexts/ScoreContext.jsx';
import SubjectCard from '../components/SubjectCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home(){

    const {score, loading, getGPA, term} = useScoreContext()
    let isEmpty = true;
    const navigate = useNavigate()

    if(score){
        console.log(isEmpty)
        if(Object.keys(score).length === 0){
            isEmpty = true;
        }else{
            isEmpty = false;
        }
    }


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
                    {
                        isEmpty && (
                        <div className=' text-white bg-red p-4 rounded-lg w-[45vw] shadow-lg/30 shadow-orange-400 border-4 border-amber-50'>
                            <h1 className=' font-black text-[3vw]' >NO SUBJECTS ADDED </h1>
                            <p className=' font-semibold text-[1.5vw] mt-2'><FontAwesomeIcon className='mx-4' icon={faArrowDown}/>Add Subjects To {term === 'termOne' ? 'Term One' : 'Term Two' } Now<FontAwesomeIcon className='mx-4' icon={faArrowDown}/></p>
                            <button className='text-[1.5vw] font-extrabold text-black mt-4 cursor-pointer bg-orange py-4 px-5 border-amber-50 border-4 rounded-lg 
                            shadow-lg/30 shadow-red-950 hover:bg-sidebar hover:shadow-lg/35 
                            hover:scale-110 transition duration-200 ease-in-out'
                            onClick={() => navigate('/add-subjects')}><FontAwesomeIcon icon={faPen}/> Edit Subjects</button>
                        </div>
                        )
                    }
                    <div className='flex flex-wrap justify-center gap-10 max-w-[80vw] mb-[10vh]'>
                    {(!loading && score) && Object.entries(score).map(([subject]) => {
                        return <SubjectCard key={subject} subject={subject} homeCheck={true}/>
                    })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home