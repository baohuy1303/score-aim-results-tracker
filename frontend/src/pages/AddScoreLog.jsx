import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addScore, deleteScore, editScore } from '../api.js';
import { faCheck, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[2.5vw] font-bold mb-0 leading-18 px-4 py-3 border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 bg-amber-100 mt-[10vh]'>NEW {unCamelCase(subject).toUpperCase()}'S {`X${multiplier.replace('hs','')}`} SCORE</h1>
                    <form onSubmit={NewScoreAdd} className="my-5">
                        <input
                            value={newScore}
                            className="bg-white py-4 px-6 outline-amber-100 rounded-lg 
                            focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 hover:bg-amber-100 hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out mr-8"
                            type="text"
                            placeholder="Add a new score"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key))
                                    e.preventDefault(); // block junk input
                            }}
                        />
                        <button disabled={newScore.trim() === ''} className={ newScore.trim() === '' ? 'bg-gray-500 py-4 px-5 rounded-lg shadow-lg/30 shadow-orange-400' : 'cursor-pointer bg-orange py-4 px-5 border-amber-50 border-4 rounded-lg shadow-lg/30 shadow-orange-400 hover:bg-sidebar hover:shadow-lg/35 hover:scale-115 transition duration-200 ease-in-out'}>
                        <FontAwesomeIcon icon={faPlus}/>
                        </button>
                        <p className='font-extralight mt-5 italic'>*number rounded to first digit after dot (.) *</p>
                    </form>
                </div>
            )}
        </>
    );
}else{
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[2.5vw] font-bold mb-0 leading-18 px-4 py-2 border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 bg-amber-100 mt-[10vh]'>{score[subject][multiplier][index]}</h1>
                    <h2 className='text-[2vw] font-bold mt-5'>EDIT {unCamelCase(subject).toUpperCase()} {`X${multiplier.replace('hs','')}`} {[`SCORE NUMBER ${Number(index) + 1}`]}</h2>
                    <form onSubmit={EditScore} className='my-5'>
                        <input
                            value={newScore}
                            type="text"
                            className="bg-white py-4 px-6 outline-amber-100 rounded-lg 
                            focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 hover:bg-amber-100 hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out mr-8"
                            placeholder="Edit this score"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key))
                                    e.preventDefault(); // block junk input
                            }}
                        />
                        <button disabled={newScore.trim() === ''}className={ newScore.trim() === '' ? 'bg-gray-500 py-4 px-5 rounded-lg shadow-lg/30 shadow-orange-400' : 'cursor-pointer bg-orange py-4 px-5 border-amber-50 border-4 rounded-lg shadow-lg/30 shadow-orange-400 hover:bg-sidebar hover:shadow-lg/35 hover:scale-115 transition duration-200 ease-in-out'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <p className='font-extralight mt-5 italic'>*number rounded to first digit after dot (.) *</p>
                    </form>
                    <h2 className='text-[1.5vw] font-bold mb-5'>OR</h2>
                    <div className='flex gap-5'>
<h1 className='text-[1.8vw] font-medium'>Delete this score</h1>
                    <button className="text-white hover:text-red-600 cursor-pointer bg-red py-2 px-4 rounded-md shadow-md/10 hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out" onClick={DeleteScore}><FontAwesomeIcon className='text-xl' icon={faTrashCan} /></button>
                    </div>
                    
                </div>
            )}
        </>
    );
}

}

export default AddScoreLog