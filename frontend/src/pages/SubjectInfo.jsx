import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';


function SubjectInfo() {
  const { score, loading, unCamelCase, getGPA } = useScoreContext();
  const subject = useParams().subjectName
  const navigate = useNavigate()

  const hs1 = score[subject]?.hs1 || [];
  const hs2 = score[subject]?.hs2 || [];
  const hs3 = score[subject]?.hs3 || [];

  function MultiplierSec({name}){
      const thisMulti = score[subject]?.[name] || [];

      function EachScoreClick(multiplier, index){
        navigate(`/home/${subject}/${multiplier}/${index}`)
      }

      function NewScore(multiplier){
        navigate(`/home/${subject}/${multiplier}/newScore`)
      }

    return<div className='w-[20vw] h-[20vh] flex flex-row justify-center items-center bg-orange'>
      <div className='flex flex-row justify-between'>
        <h2 style={{marginRight: '1vw'}}>{`x${name.replace('hs', '')}`}</h2>
        <button onClick={() => NewScore(name)}>Add Score</button>
      </div>
      
      <div>
        {loading ? (
                  <p>Loading...</p>
              ) : (thisMulti.map((score, index) => (
                  <p style={{cursor: 'pointer', marginRight: '1vw'}} key={index} onClick={() => EachScoreClick(name, index)}>{score}</p>
            )))
          }
      </div>

    </div>
  }


  return (
    <>
    <div className='flex flex-col justify-center items-center mt-[10vh]'>
            <h1 className='text-[2vw] font-black'>{unCamelCase(subject).toUpperCase()}</h1>
            <h1 className='text-[5vw] font-bold mt-3 leading-18 p-4 border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 rounded-r-xl bg-amber-100'>{getGPA(score, subject)}</h1>
    </div>


      <div>
         {loading ? (
                <p>Loading...</p>
            ) : <div className='flex flex-row justify-center items-center gap-10 mt-10'>
                    {Object.entries(score[subject]).map(([multi]) => {
                        return <MultiplierSec key={multi} name={multi}/>
                    })}
                </div>
            /* (score[subject].map((name, index) => (<MultiplierSec name={name} key={index}/>))) */
        }
        </div>
    </>
  );
}

export default SubjectInfo;
