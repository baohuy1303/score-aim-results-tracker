import { Link, useNavigate, useLocation } from "react-router-dom"
import '../css/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRightFromBracket, faBullseye, faHouse, faPen, faRobot } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';


function Navbar(){
    const location = useLocation()
    const navigate = useNavigate()
    let isHome = true

    if(location.pathname === '/home') isHome = true
    else isHome = false

    const handleBack = () =>{
        if(window.history.length > 1){
            if(location.pathname === '/add-subjects'){
                navigate('/home')
            }else{
                navigate(-1)
            }
            console.log('Current pathname:', location.pathname);    
        }
    }

    const handleLogOut = () => {
        sessionStorage.removeItem('User')
        navigate('/')
    }


    return<div className="flex flex-col-reverse sm:flex-row justify-center items-center">

        {!isHome &&
        <div className="self-start mx-5 mt-4 bg-amber-50 p-2 sm:p-3 lg:p-5 rounded-2xl shadow-xl/20 shadow-orange-400 transition duration-200 ease-in-out">
        <button className="p-2.5 nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} className="mr-1"/> <span className="hidden sm:inline ml-0.5"> Back</span> </button>
        </div>
        }
    
    
    <div className="navbar w-[85%] sm:w-[70%] lg:w-[45%] lg:text-md mt-4 p-2 lg:p-4 text-sm sm:text-md
    bg-amber-50  rounded-2xl shadow-xl/20 shadow-orange-400 transition duration-200 ease-in-out">
    <a href="https://github.com/baohuy1303/score-aim-results-tracker" target="_blank" className="p-2.5 nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out"><FontAwesomeIcon icon={faGithub} className="text-xl sm:text-2xl mt-0.5"/></a>
    <Link className="p-2.5 nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/home'}><FontAwesomeIcon icon={faHouse} className="mx-1"/> Home </Link>
    <Link className="p-2.5 nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/add-subjects'}><FontAwesomeIcon icon={faPen} className="mx-1"/> Edit<span className="hidden sm:inline ml-0.5"> Subjects</span> </Link>
{/*     <Link className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/goals'}><FontAwesomeIcon icon={faBullseye}/> Goals </Link> */}
    <button onClick={handleLogOut} className="p-2.5 nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out"> <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-1"/>Log Out</button>
    </div>
       
</div>
}

export default Navbar