import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Layout(){
    const navigate = useNavigate()
    let user = sessionStorage.getItem("User")

    useEffect(()=>{
    if(!user){
        navigate('/')
    }
    }, [user])


    return<>
        <Navbar/>
        <SideBar/>
        <Outlet/>
    </>
}
export default Layout