import { useScoreContext } from '../contexts/ScoreContext.jsx';
import {deleteSubject} from '../api.js'
import { useNavigate } from "react-router-dom"
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <div
                        onClick={openSubjectPage}
                        className="flex flex-row justify-between items-center font-bold bg-orange p-4 rounded-lg w-[20vw]
                    cursor-pointer shadow-lg/30 shadow-orange-400 border-4 border-amber-50  hover:bg-subject hover:scale-105 hover:shadow-xl/25 transition duration-100 ease-in-out"
                    >
                        <p className="text-lg">{unCamelCase(subject)}:</p>
                        <div>
                            <h1 className="text-2xl">
                                {getGPA(score, subject)}
                            </h1>
                            <div
                                className={`w-[100%] p-[7%] rounded-xl
                                ${
                                    getGPA(score, subject) >= 8
                                        ? 'bg-gradeGreen'
                                        : getGPA(score, subject) >= 6
                                        ? 'bg-gradeYellow'
                                        : 'bg-red'
                                }`}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-row justify-between items-center font-bold bg-orange p-4 rounded-lg w-[20vw] 
                    shadow-lg/30 shadow-orange-400 border-4 border-amber-50"
                    >
                        <p className="text-lg"> {unCamelCase(subject)}</p>
                        <button
                            className=" text-white hover:text-red-600 cursor-pointer bg-red py-2 px-4 rounded-md shadow-md/10 hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out"
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon
                                className="text-xl"
                                icon={faTrashCan}
                            />
                        </button>
                    </div>
                )}
            </>
        );
    }

export default SubjectCard