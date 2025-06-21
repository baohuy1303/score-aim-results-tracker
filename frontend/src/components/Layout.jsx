import Navbar from "./navbar"
import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"

function Layout(){
    return<>
        <Navbar/>
        <SideBar/>
        <Outlet/>
    </>
}
export default Layout