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


    return<div className="flex justify-center items-center gap-5">

        {!isHome &&
        <div className="mt-4 bg-amber-50 p-3 rounded-2xl shadow-xl/20 shadow-orange-400 transition duration-200 ease-in-out">
        <button className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} className="mr-1"/> Back</button>
        </div>
        }
    
    
    <div className="navbar text-md mt-4 bg-amber-50 p-3 rounded-2xl shadow-xl/20 shadow-orange-400 transition duration-200 ease-in-out">
    <a href="https://github.com/baohuy1303/score-aim-results-tracker" target="_blank" className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out"><FontAwesomeIcon icon={faGithub} className="text-2xl mt-0.5"/></a>
    <Link className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/home'}><FontAwesomeIcon icon={faHouse}/> Home </Link>
    <Link className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/add-subjects'}><FontAwesomeIcon icon={faPen}/> Edit Subjects </Link>
{/*     <Link className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out" to={'/goals'}><FontAwesomeIcon icon={faBullseye}/> Goals </Link> */}
    <button onClick={handleLogOut} className="nav-item rounded-xl font-bold hover:bg-amber-100 hover:shadow-md/20 hover:scale-110 transition duration-200 ease-in-out"> <FontAwesomeIcon icon={faArrowRightFromBracket}/> Log Out</button>
    </div>
       
</div>
}

export default Navbar