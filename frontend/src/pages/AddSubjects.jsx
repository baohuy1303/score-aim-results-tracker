import { useScoreContext } from "../contexts/ScoreContext"
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import {addSubject } from "../api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddSubjects(){
    const {score, loading, term, setTerm, setEdit, camelCase} = useScoreContext()
    const [newSubject, setNewSubject] = useState('')


      const NewSubjectAdd = async (e) => {
          e.preventDefault();
          try {
              setEdit(true);
              if (camelCase(newSubject) in score) {
                  return alert('Already Exists');
              } else {
                let subjectName = newSubject
                    if(subjectName.includes('.')){
                        subjectName = subjectName.replace(/\./g, '-');
                    }
                  const res = await addSubject(
                      term,
                      camelCase(subjectName)
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
        <div className='flex flex-col justify-center items-center max-h-[100%] text-center'>
            <h1 className='text-2xl sm:text-3xl lg:text-[3vw] font-bold mb-0 leading-18 px-3 py-1 md:p-4 
            border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 bg-amber-100 mt-[4vh] sm:mt-[5vh] md:mt-[10vh]' >EDIT SUBJECTS LIST</h1>

            <form onSubmit={NewSubjectAdd} className="my-7 lg:my-6">
                <input className="bg-white p-3 sm:py-4 sm:px-6 outline-amber-100 rounded-lg 
                focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 
                hover:bg-amber-100 hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out mr-8" value={newSubject} type="text" placeholder="Add a new subject" onChange={(e) => {setNewSubject(e.target.value)}}/>
                <button disabled={newSubject.trim() === ''} className={ newSubject.trim() === '' ? 'bg-gray-500 px-4 py-3 sm:py-4 sm:px-5 rounded-lg shadow-lg/30 shadow-orange-400 ' : 'cursor-pointer bg-orange px-4 py-3 sm:py-4 sm:px-5 border-amber-50 border-4 rounded-lg shadow-lg/30 shadow-orange-400 hover:bg-sidebar hover:shadow-lg/35 hover:scale-115 transition duration-200 ease-in-out'}>
                <FontAwesomeIcon icon={faPlus} /></button>
            </form>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10 max-w-[80vw] mb-[15vh] md:mb-[10vh]'>
                    {score && Object.entries(score).map(([subject]) => {
                        return <SubjectCard key={subject} subject={subject} homeCheck={false}/>
                    })}
                </div>
            )}
            </div>
        </>
    );
}

export default AddSubjects