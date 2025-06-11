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
                    <div onClick={openSubjectPage} style={{cursor: 'pointer'}}>
                        <p>{unCamelCase(subject)}: {getGPA(score, subject)}</p>
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