import { useScoreContext } from '../contexts/ScoreContext.jsx';
import {deleteSubject} from '../api.js'
import { useNavigate } from "react-router-dom"

    function SubjectCard({ subject, homeCheck }) {
        const navigate = useNavigate();
        const { score, term, getGPA , userid, setEdit, unCamelCase} = useScoreContext();

        const handleClick = async () =>{
            setEdit(true)
            try{
                const res = await deleteSubject(userid, term, subject)
                if(res){
                    console.log('Deleted successfully')
                }else{
                    console.error('didnt delete lol')
                }
            }catch(error){
                console.error("Error deleting score:", error);
            }finally{
                setEdit(false)
            }
        }

        function openSubjectPage(){
            navigate(`/home/${subject}`)
        }

        return (
            <>
                {homeCheck ? (
                    <div onClick={openSubjectPage} className='flex flex-row justify-between items-center font-bold bg-orange p-4 rounded-lg w-[20vw]
                    cursor-pointer shadow-lg/30 shadow-orange-400 border-4 border-amber-50  hover:bg-subject hover:scale-105 hover:shadow-xl/25 transition duration-100 ease-in-out'>
                        <p className='text-lg'>{unCamelCase(subject)}:</p>
                        <div>
                            <h1 className='text-2xl'>{getGPA(score, subject)}</h1>
                            <div className='w-[100%] p-[7%] bg-gradeGreen rounded-xl'></div>
                        </div>

                    </div>
                ) : (
                    <div>
                        <p>{unCamelCase(subject)} <button onClick={handleClick}>Delete Subject</button></p>
                        <hr />
                    </div>
                )}
            </>
        );
    }

export default SubjectCard