import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addScore, deleteScore, editScore } from '../api.js';

function AddScoreLog(){
    const { userid, term,score, loading, unCamelCase, setEdit } = useScoreContext();
    const {subject, multiplier, index} = useParams()
    const [newScore, setNewScore] = useState('')
    const navigate = useNavigate()
    
    const NewScoreAdd = async (e) => {
              e.preventDefault();
              try {
                  setEdit(true);
                  const res = await addScore(
                      userid,
                      term,
                      subject,
                      multiplier,
                      newScore
                  );
                  if (res) {
                      console.log('added successfully');
                  } else {
                      console.error('didnt added lol');
                  }
              } catch (error) {
                  console.error('Error adding score:', error);
              } finally {
                  setEdit(false);
                  setNewScore('');
                  navigate(`/home/${subject}`);
              }
          };

        const EditScore = async (e) => {
              e.preventDefault();
              try {
                  setEdit(true);
                  const res = await editScore(
                      userid,
                      term,
                      subject,
                      multiplier,
                      index,
                      newScore
                  );
                  if (res) {
                      console.log('edited successfully');
                  } else {
                      console.error('didnt edit lol');
                  }
              } catch (error) {
                  console.error('Error editing score:', error);
              } finally {
                  setEdit(false);
                  setNewScore('');
              }
          };

        const DeleteScore = async (e) => {
              e.preventDefault();
              try {
                  setEdit(true);
                  const res = await deleteScore(
                      userid,
                      term,
                      subject,
                      multiplier,
                      index
                  );
                  if (res) {
                      console.log('deleted successfully');
                  } else {
                      console.error('didnt delete lol');
                  }
              } catch (error) {
                  console.error('Error deleting score:', error);
              } finally {
                  setEdit(false);
                  setNewScore('');
                  navigate(`/home/${subject}`);
              }
          };

          const handleChange = (e) => {
              const val = e.target.value;

              if (val === '') {
                  setNewScore(val);
                  return;
              }

              // Block leading zero unless it's followed by a dot (e.g., "0." is OK)
              if (/^0\d+/.test(val)) {
                  return; // reject input like "01", "007"
              }

              // Validate numeric pattern and max value
              if (/^\d*\.?\d*$/.test(val) && parseFloat(val) <= 10) {
                  setNewScore(val);
              }
          };

if(index == 'newScore'){
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>New Score</h1>
                    <form onSubmit={NewScoreAdd}>
                        <input
                            value={newScore}
                            type="text"
                            placeholder="Add a new score"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key))
                                    e.preventDefault(); // block junk input
                            }}
                        />
                        <button disabled={newScore.trim() === ''}>Add</button>
                    </form>
                    <p>{multiplier}</p>
                </>
            )}
        </>
    );
}else{
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>{score[subject][multiplier][index]}</h1>
                    <form onSubmit={EditScore}>
                        <input
                            value={newScore}
                            type="text"
                            placeholder="Edit this score"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key))
                                    e.preventDefault(); // block junk input
                            }}
                        />
                        <button disabled={newScore.trim() === ''}>
                            Confirm
                        </button>
                    </form>
                    <button onClick={DeleteScore}>Delete this score</button>
                    <p>
                        {multiplier} {index}
                    </p>
                </>
            )}
        </>
    );
}

}

export default AddScoreLog