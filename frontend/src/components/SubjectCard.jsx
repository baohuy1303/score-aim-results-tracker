import { useScoreContext } from '../contexts/ScoreContext.jsx';
import {deleteScore} from '../api.js'

    function SubjectCard({ subject, homeCheck }) {
        const { score, term, getGPA , userid, setEdit} = useScoreContext();

        const handleClick = async () =>{
            setEdit(true)
            try{
                const res = await deleteScore(userid, term, subject)
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
        
        function unCamelCase(text) {
            const result = text.replace(/([A-Z])/g, ' $1');
            return result.charAt(0).toUpperCase() + result.slice(1);
        }

        return (
            <>
                {homeCheck ? (
                    <div>
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