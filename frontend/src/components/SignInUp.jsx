import { useState } from "react";
import { createUser } from "../api";

function SignInUp(){

    const [signUp, setSignUp] = useState(true)
    const [user, setUser] = useState({
        email: '',
        passowrd: ''
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            let res = await createUser(user)
            if(res.status !== 200)
                alert('Cannot create user')
        }catch(error){
            console.error('Failed to create user:', error);
        }

    }

    return (
        <>
        {signUp ? <>
            <h1>Create Account</h1>
            
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Email" name="email" required/> {/*implement max length*/}
                <input onChange={handleChange} type="password"  placeholder="Password" name="password" required/>
                <button type="submit">Sign Up</button>
            </form>
        </>
        : 
        <>
            <h1>Log In</h1>
            
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Email" name="email" required/>
                <input onChange={handleChange} type="text" placeholder="Password" name="password" required/>
                <button type="submit">Sign In</button>
            </form>
        </>}
        
        <button onClick={() => setSignUp(!signUp)}>{signUp ? 'Already have an account?' : 'Create an Account'}</button>

        </>
    );
}

export default SignInUp