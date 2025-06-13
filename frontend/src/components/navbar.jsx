import { Link, useNavigate, useLocation } from "react-router-dom"
import '../css/navbar.css'


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

    return<div className="navbar">
        {!isHome && <button className="nav-item" onClick={handleBack}>Back</button>}
    <Link className="nav-item" to={'/home'}>Home</Link>
    <Link className="nav-item" to={'/add-subjects'}>Edit Subject List</Link>
    </div>
}

export default Navbar