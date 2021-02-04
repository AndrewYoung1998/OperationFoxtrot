import React, {useRef, useState} from 'react';
import './css/forms.css';
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

export default function ForgotPassword(){
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message,  setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage("")
            setError("");
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage("Check Inbox for password reset");
        } catch {
            setError("Failed to reset password");
        }
        setLoading(false)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Password Reset</h1>
                </div>
                <p>{error}</p>
                <p>{message}</p>
                <div className="form-body">
                    <input type="email" ref={emailRef} placeholder="Email"/>
                    <br/>

                    <button type="submit" disabled={loading}>Reset Password</button>
                    <div className="sign-up">
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
                <div className="sign-up">
                    Need an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}
