import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';


function SubjectInfo() {
  const { score, loading, unCamelCase } = useScoreContext();
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

    return<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{marginRight: '1vw'}}>{name.toUpperCase()}</h2>
      {loading ? (
                <p>Loading...</p>
            ) : (thisMulti.map((score, index) => (
            <p style={{cursor: 'pointer', marginRight: '1vw'}} key={index} onClick={() => EachScoreClick(name, index)}>{score}</p>
          )))
        }
      <button onClick={() => NewScore(name)}>Add Score</button>
    </div>
  }


  return (
    <>
      <h1>{unCamelCase(subject)}</h1>

      <div>
         {loading ? (
                <p>Loading...</p>
            ) : <div>
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
