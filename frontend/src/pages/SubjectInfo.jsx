import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import AddScoreLog from './AddScoreLog.jsx';
import { useState } from 'react';
import '../css/subject-info.css'


function SubjectInfo() {
  const { score, loading, unCamelCase, getGPA} = useScoreContext();
  const subject = useParams().subjectName
  const navigate = useNavigate()

  const [popUpNewScore, togglePopUpNewScore] = useState([false, null])

  const hs1 = score[subject]?.hs1 || [];
  const hs2 = score[subject]?.hs2 || [];
  const hs3 = score[subject]?.hs3 || [];

  function MultiplierSec({name}){
      const thisMulti = score[subject]?.[name] || [];

      function EachScoreClick(multiplier, index){
        navigate(`/home/${subject}/${multiplier}/${index}`)
      }

      function NewScore(multiplier){
/*         navigate(`/home/${subject}/${multiplier}/newScore`) */
          togglePopUpNewScore([!popUpNewScore[0], multiplier])
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
          <h2>GPA: {getGPA(score, subject)}</h2>
          <div>
              {
                  loading ? (
                      <p>Loading...</p>
                  ) : (
                      <div>
                          {Object.entries(score[subject]).map(([multi]) => {
                              return <MultiplierSec key={multi} name={multi} />;
                          })}

                          {popUpNewScore[0] === true && (<div className="modal">
                              <div className="overlay"></div>
                              <div className="modal-content">
                                  <AddScoreLog
                                      subject={subject}
                                      multiplier={popUpNewScore[1]}
                                      index={'newScore'}
                                  />
                                  <button className="close-modal">CLOSE</button>
                              </div>
                          </div>)}
                      </div>
                  )
                  /* (score[subject].map((name, index) => (<MultiplierSec name={name} key={index}/>))) */
              }
          </div>
      </>
  );
}

export default SubjectInfo;
