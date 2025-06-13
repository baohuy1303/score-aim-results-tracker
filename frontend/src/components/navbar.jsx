import { Link, useNavigate, useLocation} from "react-router-dom"
import { useState } from "react"
import '../css/navbar.css'


function Navbar(){
    const location = useLocation()
    const navigate = useNavigate()
    let isHome = true

    if(location.pathname === "/home"){
        isHome = true
    }else{
        isHome = false
    }

    const handleBack = () => {
        navigate(-1)
    }

    return<div className="navbar">
    {!isHome && (<Link onClick={handleBack} className="nav-item">Back</Link>)}
    <Link className="nav-item" to={'/home'}>Home</Link>
    <Link className="nav-item" to={'/add-subjects'}>Edit Subject List</Link>
    </div>
}

export default Navbar