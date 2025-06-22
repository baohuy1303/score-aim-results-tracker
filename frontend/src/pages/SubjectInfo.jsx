import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

    return<div className='w-[20vw] h-[40vh] flex flex-col items-center bg-orange rounded-lg
    shadow-lg/30 shadow-orange-400 border-4 border-amber-50
    hover:scale-105 hover:shadow-xl/25 transition duration-100 ease-in-out'>
      <div className='flex flex-row justify-between w-[100%] items-center'>
        <h2 className='text-[1.5vw] font-black mt-5 ml-6'>{`x${name.replace('hs', '')}`}</h2>
        <button className="cursor-pointer mt-5 mr-5 bg-white py-3 px-4 border-amber-50 border-4 rounded-[100%] shadow-lg/30 shadow-orange-400 hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out" onClick={() => NewScore(name)}><FontAwesomeIcon icon={faPlus} /></button>
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
