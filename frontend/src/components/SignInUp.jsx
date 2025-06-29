import { useContext, useState } from "react";
import { AssignAxiosAuthHeader, createUser, logIn } from "../api";
import { useNavigate } from 'react-router-dom';
/* import axios from "axios"; */
import { useScoreContext } from '../contexts/ScoreContext.jsx';

function SignInUp(){

    const {setToken} = useScoreContext()    
    const [signUp, setSignUp] = useState(false)
    const [user, setUser] = useState({
        email: '',
        passowrd: ''
    })

    const navigate = useNavigate()


    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSignUp(e) {
        e.preventDefault()

        try{
            let res = await createUser(user)
            if(res.status !== 200){
                alert('Cannot create user')
            }
            console.log(res)
        }catch(error){
            console.error('Failed to create user:', error);
        }
    }


    async function handleSignIn(e) {
        e.preventDefault()

        try{
            let res = await logIn(user)
            console.log(res)
            if(res.data.success === true){
                sessionStorage.setItem("User", res.data.token)
                AssignAxiosAuthHeader(res.data.token)
                setToken(res.data.token)
                navigate('/home')
            }else{
                alert('Login failed')
            }
        }catch(error){
            console.error('Failed to create user:', error);
        }

    }

    return (
        <>
        {signUp ? <>
            <h1>Create Account</h1>
            
            <form onSubmit={handleSignUp}>
                <input onChange={handleChange} type="text" placeholder="Email" name="email" required/> {/*implement max length*/}
                <input onChange={handleChange} type="password"  placeholder="Password" name="password" required/>
                <button type="submit">Sign Up</button>
            </form>
        </>
        : 
        <>
            <h1>Log In</h1>
            
            <form onSubmit={handleSignIn}>
                <input onChange={handleChange} type="text" placeholder="Email" name="email" required/>
                <input onChange={handleChange} type="password" placeholder="Password" name="password" required/>
                <button className='cursor-pointer' type="submit">Sign In</button>
            </form>
        </>}
        
        <button onClick={() => setSignUp(!signUp)}>{signUp ? 'Already have an account?' : 'Create an Account'}</button>

        </>
    );
}

export default SignInUp