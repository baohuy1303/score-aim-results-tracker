import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams } from 'react-router-dom';

function SubjectInfo() {
  const { score, loading, unCamelCase } = useScoreContext();
  const subject = useParams().subjectName

  const hs1 = score[subject]?.hs1 || [];
  const hs2 = score[subject]?.hs2 || null;
  const hs3 = score[subject]?.hs3 || null;

  return (
    <>
      <h1>{unCamelCase(subject)}</h1>

      <div>
        <h2>HS1</h2>
         {loading ? (
                <p>Loading...</p>
            ) : (hs1.map((score, index) => (<p key={index}>{score}</p>)))
        }
        </div>
    </>
  );
}

export default SubjectInfo;
