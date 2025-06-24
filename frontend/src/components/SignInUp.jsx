import { useState } from "react";

function SignInUp(){

    const [signUp, setSignUp] = useState(true)

    return (
        <>
        {signUp ? <>
            <h1>Create Account</h1>
            
            <form action="#">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <button>Sign Up</button>
            </form>
        </>
        : 
        <>
            <h1>Log In</h1>
            
            <form action="#">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <button>Sign In</button>
            </form>
        </>}
        
        <button onClick={() => setSignUp(!signUp)}>{signUp ? 'Already have an account?' : 'Create an Account'}</button>

        </>
    );
}

export default SignInUp