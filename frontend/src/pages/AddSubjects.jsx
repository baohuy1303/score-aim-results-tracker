import { useScoreContext } from "../contexts/ScoreContext"
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import { addScore } from "../api";

function AddSubjects(){
    const {score, loading, term, setTerm, userid, setEdit} = useScoreContext()
    const [newSubject, setNewSubject] = useState('')

    const handleChange = (e) => {
          setTerm(e.target.value);
      };

      function camelCase(str) {
          // converting all characters to lowercase
          let ans = str.toLowerCase();

          // Returning string to camelcase
          return ans.split(' ').reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
      }

      const NewSubjectAdd = async (e) => {
          e.preventDefault();
          try {
              setEdit(true);
              if (camelCase(newSubject) in score) {
                  return alert('Already Exists');
              } else {
                  const res = await addScore(
                      userid,
                      term,
                      camelCase(newSubject)
                  );
                  if (res) {
                      console.log('added successfully');
                  } else {
                      console.error('didnt added lol');
                  }
              }
          } catch (error) {
              console.error('Error adding score:', error);
          } finally {
              setEdit(false);
              setNewSubject('');
          }
      };

    return (
        <>
            <h1>Subject List</h1>
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

            <form onSubmit={NewSubjectAdd}>
                <input value={newSubject} type="text" placeholder="Add a new subject" onChange={(e) => {setNewSubject(e.target.value)}}/>
                <button>Add</button>
            </form>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <hr />
                    {Object.entries(score).map(([subject]) => {
                        return <SubjectCard key={subject} subject={subject} homeCheck={false}/>
                    })}
                </div>
            )}
        </>
    );
}

export default AddSubjects