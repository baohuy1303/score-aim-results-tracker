import { Link } from "react-router-dom"
import '../css/navbar.css'


function Navbar(){
    return<div className="navbar">
    <Link className="nav-item" to={'/home'}>Home</Link>
    <Link className="nav-item" to={'/add-subjects'}>Add</Link>
    </div>
}

export default Navbar